import { EventEmitter } from "events";
import Flight from "../models/flight";
import { handleStoreUpdate } from "./store";
import Airport from "../models/airport";

class EventHandler extends EventEmitter {}
const emitter = new EventHandler();

export const setGeometrySelected = (payload: Flight | Airport | null): void => {
  const store = handleStoreUpdate('setGeometrySelected', payload);
  emitter.emit('setGeometrySelected', store.state.selected);
}

export const setFlightData = (payload: Flight[]): void => {
  const store = handleStoreUpdate('setFlightData', payload);
  emitter.emit('setFlightData', store.data.flights);
}

export const setAirportData = (payload: Airport[]): void => {
  const store = handleStoreUpdate('setAirportData', payload);
  emitter.emit('setAirportData', store.data.flights);
}

export default emitter;