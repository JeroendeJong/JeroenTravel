import React from 'react';
import styled, { css } from 'styled-components';
import emitter, { setFlightData, setAirportData } from '../store/emit';

// models
import Flight from '../models/flight';
import Airport from '../models/airport';

// UI content
import FlightContent from './content-detail/flight-content';
import AirportContent from './content-detail/airport-content';
import MainScreen from './main-screen';
import map from '../map';
import { MOBILE_BREAKPOINT } from '../mobile';
import { rgba } from 'polished';

import {getFlightListURL, getAirportListURL} from '../constants';

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
  background-color: ${p => p.theme.color.secondary};
  color: ${p => p.theme.color.white};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);
  border-radius: 6px;
  padding: 15px;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(8px);
    background-color: ${p => rgba(p.theme.color.secondary,0.9)};
  }
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
    console.log(getFlightListURL());
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
