import { EventBus } from 'event-bus';

export class Controller {
  name: string;
  bindings: Record<string, (() => void)[]>;
  constructor(name: string) {
    this.bindings = {};
    this.name = name;
  }
  setBinding(event: string, cb: (payload?: any) => void) {
    this.bindings[event] = this.bindings[event]
      ? [...this.bindings[event], cb]
      : [cb];
  }
  init(eventBus: EventBus) {
    Object.entries(this.bindings).forEach(([event, cbs]) => {
      cbs.forEach((cb) => eventBus.on(`${this.name}:${event}`, cb));
    });
  }
}
