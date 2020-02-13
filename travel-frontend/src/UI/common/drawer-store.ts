import { EventEmitter } from "events";


class DrawerStore extends EventEmitter {
  public active: boolean = true;

  public notifyActive(active: boolean) : void {
    this.active = active;
  }
  
  public emitDrawerActiveState(active: boolean): void {
    this.emit('DRAWER_ACTIVE', active);
  }

  public setTopContent(el: JSX.Element | null): void {
    this.emit('DRAWER_TOP_CONTENT', el);
  }
}

export default new DrawerStore();
