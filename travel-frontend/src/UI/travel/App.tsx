import React from 'react';
import { getTravelTrips } from '../../constants';
import Drawer from '../common/drawer';
import { TripOverview } from './trip-overview-item';
import TripDetailPage from './trip-detail-page';
import TripListScreen from './main-trip-list';
import map from '../../map';
import { TRAVEL_ROUTE } from '../../routes';
import TripSegmentDetailPage from './segment-detail-page';

interface ComponentState {
  selected: null | TripOverview;
  trips: any[];
  selectedSegmentId: null | number;
};

class App extends React.Component<any, ComponentState> {
  private targetRef: any = React.createRef();

  public state: ComponentState = {
    selected: null,
    trips: [],
    selectedSegmentId: null
  }

  public componentDidMount(): void {
    fetch(getTravelTrips())
      .then(resp => resp.json())
      .then(json => {
        this.setState({trips: json})
      });
  }

  componentDidUpdate(prevProps: any) {
    const previousWasNotTravel = prevProps.location.pathname !== TRAVEL_ROUTE;
    const newPropsIsTravel = this.props.location.pathname === TRAVEL_ROUTE;

    if (previousWasNotTravel && newPropsIsTravel) {
      map.clearAll();
    }
  }

  private handleDetailClose = () => this.setState({selected: null, selectedSegmentId: null});
  private handleTripSelected = (trip: TripOverview): void => this.setState({selected: trip});
  private handleSegmentSelect = (segmentId: number) => this.setState({selectedSegmentId: segmentId});
  private handleSegmentBack = () => this.setState({selectedSegmentId: null})

  public render(): any {
    return (
      <Drawer ref={this.targetRef}>
        {this.state.selected === null && 
          <TripListScreen 
            trips={this.state.trips} 
            onClick={this.handleTripSelected}
          />
        }

        {this.state.selected && !this.state.selectedSegmentId &&
          <TripDetailPage 
            trip={this.state.selected} 
            onClose={this.handleDetailClose} 
            onClick={this.handleSegmentSelect}
          />
        }

        {this.state.selected && this.state.selectedSegmentId &&
          <TripSegmentDetailPage 
            id={this.state.selectedSegmentId} 
            trip={this.state.selected} 
            onClose={this.handleDetailClose} 
            onBack={this.handleSegmentBack}
          />
        }

      </Drawer>
    );
  }
}

export default App;
