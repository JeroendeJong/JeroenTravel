import React from 'react';
import { getTravelTrips } from '../../constants';
import Drawer from '../common/drawer';
import { TripOverview } from './trip-overview-item';
import TripDetailPage from './trip-detail-page';
import TripListScreen from './main-trip-list';

interface ComponentState {
  selected: null | TripOverview;
  trips: any[]
}

class App extends React.Component<{}, ComponentState> {
  private targetRef: any = React.createRef();

  public state: ComponentState = {
    selected: null,
    trips: []
  }

  public componentDidMount(): void {
    fetch(getTravelTrips())
      .then(resp => resp.json())
      .then(json => {
        this.setState({trips: json})
      });
  }

  private handleDetailClose = () => {
    this.setState({selected: null});
  }

  private handleTripSelected = (trip: TripOverview): void => {
    this.setState({selected: trip});
  }

  public render(): any {
    return (
      <Drawer ref={this.targetRef}>
        {this.state.selected === null && 
          <TripListScreen trips={this.state.trips} onClick={this.handleTripSelected}/>
        }

        {this.state.selected && 
          <TripDetailPage trip={this.state.selected} onClose={this.handleDetailClose}/>
        }

      </Drawer>
    );
  }
}

export default App;
