import { EventBus } from '../../event-bus';

export class Controller {
  name: string;
  bindings: Record<string, (() => void)[]>;
  constructor(name) {
    this.bindings = {};
    this.name = name;
  }
  setBinding(event, cb) {
    this.bindings[event] = this.bindings[event]
      ? [...this.bindings[event], cb]
      : [cb];
  }
  init(eventBus: EventBus) {
    console.log(this.bindings);
    Object.entries(this.bindings).forEach(([event, cbs]) => {
      cbs.forEach((cb) => eventBus.on(`${this.name}:${event}`, cb));
    });
  }
}
