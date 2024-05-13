export class Component<T extends Object = any> {
  parent: HTMLElement | Element | undefined;
  element: HTMLElement | Element | undefined;
  _state: T;
  constructor() {
    this.parent = undefined;
    this.element = undefined;
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
    if (this.element && this.parent) {
      this.parent.innerHTML = '';
      this.parent.appendChild(this.element);
    }
  }
}
