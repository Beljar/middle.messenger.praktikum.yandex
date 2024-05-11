export class Component {
  parent: HTMLElement | undefined;
  element: HTMLElement | undefined;
  _state: any;
  constructor() {
    this.parent = undefined;
    this.element = undefined;
    this._state = {};
  }
  set state(state: any) {
    console.log(state);
    this._state = state;
    this.render();
  }
  get state() {
    console.log(this._state);
    return this._state;
  }
  setParent(parent: HTMLElement) {
    this.parent = parent;
  }
  render() {
    if (this.element) {
      this.parent.innerHTML = '';
      this.parent.appendChild(this.element);
    }
  }
}
