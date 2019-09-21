import React from 'react';
import styled, { css } from 'styled-components';
import emitter from '../store/emit';

// models
import Flight from '../models/flight';
import Airport from '../models/airport';

// UI content
import FlightContent from './flight-content';
import AirportContent from './airport-content';
import StatsContent from './main-screen';

const FloatingBottomDrawer = css`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
`

const Drawer = styled.div`
  ${FloatingBottomDrawer}

  height: 33%;
  z-index: 2;
  background-color: #003f5c;
  color: white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);
  border-radius: 6px;
  padding: 15px;
  padding-bottom: 10px;
  padding-top: 10px;

  .slick-dots {
    margin-bottom: 20px;
  }

  .slick-dots li.slick-active button:before {
    color: white !important
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
        {Flight.isFlight(this.state.selected) &&
          <FlightContent flight={this.state.selected as Flight}/>
        }

        {Airport.isAirport(this.state.selected) &&
          <AirportContent/>
        }

        {this.state.selected === null && 
          <StatsContent/>
        }
      </Drawer>
    );
  }
}

export default App;
