export class Component {
  parent: HTMLElement | undefined;
  element: HTMLElement | undefined;
  constructor() {
    this.parent = undefined;
    this.element = undefined;
  }
  setParent(parent: HTMLElement) {
    this.parent = parent;
  }
  render() {
    if (this.element) this.parent.appendChild(this.element);
  }
}
