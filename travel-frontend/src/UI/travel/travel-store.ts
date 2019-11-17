import { EventEmitter } from "events";


class TravelStore extends EventEmitter {

  private data: any = {}

  set = (id: string, payload: any) => {
    this.data[id] = payload;
  }

  get = (id: string): any => {
    return this.data[id];
  }


}

export default new TravelStore();