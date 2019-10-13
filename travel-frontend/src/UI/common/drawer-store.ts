import { EventEmitter } from "events";


class DrawerStore extends EventEmitter {
  
  public emitDrawerActiveState(active: boolean) {
    this.emit('DRAWER_ACTIVE', active);
  }
}

export default new DrawerStore();
