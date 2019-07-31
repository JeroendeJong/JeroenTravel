import { EventEmitter } from "events";


class EventHandler extends EventEmitter {}
const emitter = new EventHandler();

const setFlightSelected = (payload: any): void => {
  emitter.emit('setFlightSelected', payload);
}

export default emitter;