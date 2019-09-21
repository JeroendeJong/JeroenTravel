import { EventEmitter } from "events";
import Flight from "../models/flight";
import { handleStoreUpdate } from "./store";

class EventHandler extends EventEmitter {}
const emitter = new EventHandler();

export const setFlightSelected = (payload: Flight): void => {
  const store = handleStoreUpdate('setFlightSelected', payload);
  emitter.emit('setFlightSelected', store.state.selected);
}

export default emitter;