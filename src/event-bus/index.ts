class EventBus {
  constructor() {
    this.events = {};
  }
  on(event, cb) {
    this.events[event] = this.events[event]
      ? [...this.events[event], cb]
      : [cb];
  }
  emit(event) {
    const cbs = this.events[event];
    if (cbs) {
      cbs.forEach((cb) => {
        cb();
      });
    }
  }
}

export const eventBus = new EventBus();
