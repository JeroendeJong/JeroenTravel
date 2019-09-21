import React from 'react';
import styled, { css } from 'styled-components';
import emitter from '../store/emit';

// models
import Flight from '../models/flight';
import Airport from '../models/airport';

// UI content
import FlightContent from './flight-content';
import AirportContent from './airport-content';
import MainScreen from './main-screen';

const FloatingBottomDrawer = css`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;

  @media only screen and (min-width: 700px) {
    top: 10px;
    width: 350px;
  }

  @media only screen and (max-width: 700px) {
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
  padding-bottom: 10px;
  padding-top: 10px;
`;

interface ComponentState {
  selected: null | Airport | Flight;
}

class App extends React.Component<{}, ComponentState> {

  public state: ComponentState = {
    selected: null
  }

  public componentDidMount(): void {
    emitter.on('setFlightSelected', this.handleFlightSelected);
    emitter.on('setFlightDeselected', this.handleFlightDeselected);
  }

  public componentWillUnmount(): void {
    emitter.removeListener('setFlightSelected', this.handleFlightSelected);
    emitter.removeListener('setFlightDeselected', this.handleFlightDeselected);
  }

  private handleFlightSelected = (flight: Flight): void => {
    this.setState({selected: flight})
  }

  private handleFlightDeselected = (): void => {
    this.setState({selected: null})
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
