import Flight from "../models/flight";

interface StoreType {
  state: {
    selected: Flight | null
  }
}

const StorageObject: StoreType = {
  state: {
    selected: null
  }
}

export const handleStoreUpdate = (type: string, payload: any): any => {
  switch (type) {
    case 'setFlightSelected': {
      type A = Flight | null;
      const data = payload as A;
      StorageObject.state.selected = data;
      return StorageObject;
    }
  }
}

export default StorageObject;