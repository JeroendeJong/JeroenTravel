import React from 'react';
import styled, { css } from 'styled-components';
import emitter, { setFlightData, setAirportData } from '../store/emit';

// models
import Flight from '../models/flight';
import Airport from '../models/airport';

// UI content
import FlightContent from './flight-content';
import AirportContent from './airport-content';
import MainScreen from './main-screen';
import map from '../map';
import { MOBILE_BREAKPOINT } from '../mobile';

const FloatingBottomDrawer = css`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    top: 10px;
    width: 350px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 33%;
  }
`;

const Drawer = styled.div`
  ${FloatingBottomDrawer}

  z-index: 2;
  background-color: #003f5c;
  color: white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);
  border-radius: 6px;
  padding: 15px;
`;

interface ComponentState {
  selected: null | Airport | Flight;
}

class App extends React.Component<{}, ComponentState> {

  public state: ComponentState = {
    selected: null
  }

  public componentDidMount(): void {
    emitter.on('setGeometrySelected', this.handleFlightSelected);

    fetch('http://localhost:8080/flights/list')
      .then(resp => resp.json())
      .then(json => {
        setFlightData(json);
        map.setFlightLayer(json);
      });

    fetch('http://localhost:8080/airports/list')
      .then(resp => resp.json())
      .then(json => {
        setAirportData(json);
        map.setAirportLayer(json);
        console.log(json);
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
          <AirportContent/>
        }
      </Drawer>
    );
  }
}

export default App;
