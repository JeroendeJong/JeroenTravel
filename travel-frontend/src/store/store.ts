import Flight from "../models/flight";
import Airport from "../models/airport";

interface StoreType {
  state: {
    selected: Flight | Airport | null
  },
  data: {
    flights: Flight[] | null,
    airports: Airport[] | null
  }
}

const StorageObject: StoreType = {
  state: {
    selected: null
  },
  data: {
    flights: null,
    airports:  null
  }
}

const callbackArray: Function[] = [];

export const handleStoreUpdate = (type: string, payload: any): any => {
  switch (type) {
    case 'setGeometrySelected': {
      type A = Flight | Airport | null;
      const data = payload as A;
      StorageObject.state.selected = data;
      return StorageObject;
    }

    case 'setAirportData': {
      type A = Airport[];
      const data = payload as A;
      StorageObject.data.airports = data;
      return StorageObject;
    }

    case 'setFlightData': {
      type A = Flight[];
      const data = payload as A;
      StorageObject.data.flights = data;
      return StorageObject;
    }
  }

  callbackArray.forEach(cb => cb(StorageObject));
}

export const getCurrentStoreSnapshot = () => {
  return {...StorageObject};
}

export default StorageObject;