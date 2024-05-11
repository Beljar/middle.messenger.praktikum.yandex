import { eventBus } from '../../../event-bus';
import { Component } from '../Component';

export class Router extends Component {
  constructor(pages: Record<string, Component>) {
    super();
    this.pages = pages;
  }
  set state(state) {
    console.log(state);
    super.state = state;
  }
  get state() {
    console.log(this._state);
    return this._state;
  }
  render(): void {
    console.log(this.state.route);
    const page = this.pages[this.state.route] || this.pages['404'];
    const root = document.querySelector('#app');
    if (!root) return;
    page.setParent(root);
    eventBus.emit(`mount:${this.state.route}`);
    page.render();
  }
}
