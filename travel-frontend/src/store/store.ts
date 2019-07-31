
interface Flight {

}


interface StoreType {
  state: {
    selected: Flight | null
  }
}

const Store: StoreType = {

  state: {
    selected: null
  }

}





const handleStoreUpdate = (type: string, payload: any) => {



  switch (type) {



    case 'setFlightSelected': {
      interface A { flight: null | Flight };
      const data = payload as A;
      Store.state.selected = data.flight;
    }

  }



}