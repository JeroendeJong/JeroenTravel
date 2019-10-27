import React from 'react';
import emitter, { setFlightData, setAirportData } from '../../store/emit';
import Flight from '../../models/flight';
import Airport from '../../models/airport';
import FlightContent from './content-detail/flight-content';
import AirportContent from './content-detail/airport-content';
import MainScreen from './main-screen';
import map from '../../map';

import {getFlightListURL, getAirportListURL} from '../../constants';
import Drawer from '../common/drawer';

interface ComponentState {
  selected: null | Airport | Flight;
}

class App extends React.Component<{}, ComponentState> {

  public state: ComponentState = {
    selected: null
  }

  public componentDidMount(): void {
    map.clearAll();
    emitter.on('setGeometrySelected', this.handleFlightSelected);

    fetch(getFlightListURL())
      .then(resp => resp.json())
      .then(json => {
        setFlightData(json);
        map.setFlightLayer(json);
      });

    fetch(getAirportListURL())
      .then(resp => resp.json())
      .then(json => {
        setAirportData(json);
        map.setAirportLayer(json);
      });
  }

  public componentWillUnmount(): void {
    emitter.removeListener('setGeometrySelected', this.handleFlightSelected);
  }

  private handleFlightSelected = (flightOrAirport: Flight | Airport | null): void => {
    this.setState({selected: flightOrAirport})
  }

  public render(): any {
    return (
      <Drawer>
        {this.state.selected === null && 
          <MainScreen/>
        }

        {Flight.isFlight(this.state.selected) &&
          <FlightContent flight={this.state.selected as Flight}/>
        }

        {Airport.isAirport(this.state.selected) &&
          <AirportContent airport={this.state.selected as Airport}/>
        }
      </Drawer>
    );
  }
}

export default App;
