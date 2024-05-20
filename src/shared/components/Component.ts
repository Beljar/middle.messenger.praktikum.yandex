export class Component<T extends Object = any> {
  parent: HTMLElement | Element | undefined;
  html: string | undefined;
  _state: T;
  constructor() {
    this.parent = undefined;
    this.html = undefined;
    this._state = {};
  }
  set state(state: T) {
    this._state = state;
    this.render();
  }
  get state() {
    return this._state;
  }
  setParent(parent: HTMLElement | Element) {
    this.parent = parent;
  }
  render() {
    if (this.html && this.parent) {
      this.parent.innerHTML = this.html;
    }
  }
}
