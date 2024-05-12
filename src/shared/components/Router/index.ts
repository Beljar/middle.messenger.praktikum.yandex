import { eventBus } from '../../../event-bus';
import { Component } from '../Component';

export class Router extends Component {
  pages: Record<string, Component>;
  constructor(pages: Record<string, Component>) {
    super();
    this.pages = pages;
  }
  set state(state) {
    super.state = state;
  }
  get state() {
    return this._state;
  }
  render(): void {
    const page = this.pages[this.state.route] || this.pages['404'];
    const root = document.querySelector('#app');
    if (!root) return;
    page.setParent(root);
    eventBus.emit(`${this.state.route}:mount`);
    page.render();
  }
}
