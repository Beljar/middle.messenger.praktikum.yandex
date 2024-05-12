export type EventCb = (payload: any) => void;

export class EventBus {
  events: Record<string, EventCb[]>;
  constructor() {
    this.events = {};
  }
  on(eventName: string, cb: EventCb) {
    this.events[eventName] = this.events[eventName]
      ? [...this.events[eventName], cb]
      : [cb];
  }
  emit(eventName: string, payload?: any) {
    const cbs = this.events[eventName];
    if (cbs) {
      cbs.forEach((cb) => {
        cb(payload);
      });
    }
  }
}

export const eventBus = new EventBus();
