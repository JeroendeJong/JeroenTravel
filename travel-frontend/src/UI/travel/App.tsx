import React from 'react';
import { getTravelTrips } from '../../constants';
import Drawer from '../common/drawer';
import { TripOverview } from './trip-item';
import TripDetailPage from './trip-detail-page';
import TripListScreen from './main-trip-list';
import map from '../../map';
import { TRAVEL_ROUTE } from '../../routes';
import TripSegmentDetailPage from './trip-segment-detail-page';

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

  private handleContentCloseCall = (callId: any) => {
    console.log(callId, 'close');
    if (callId === 'TripDetailPage') {
      this.setState({ selected: null });
    } else if (callId === 'TripSegmentDetailPage') {
      this.setState({selected: null, selectedSegmentId: null});
    }
  }

  private handleContentBackCall = (callId: any) => {
    console.log(callId, 'back');
    if (callId === 'TripSegmentDetailPage') {
      this.setState({selectedSegmentId: null});
    }
  }

  private handleDetailClose = () => this.setState({selected: null, selectedSegmentId: null});
  private handleTripSelected = (trip: TripOverview): void => this.setState({selected: trip});
  private handleSegmentSelect = (segmentId: number) => this.setState({selectedSegmentId: segmentId});
  private handleSegmentBack = () => this.setState({selectedSegmentId: null})

  public render(): any {
    return (
      <Drawer 
        ref={this.targetRef} 
        onCloseContentId={this.handleContentCloseCall} 
        onBackContentId={this.handleContentBackCall}
      >
        {this.state.selected === null && 
          <TripListScreen 
            trips={this.state.trips} 
            onClick={this.handleTripSelected}
          />
        }

        {this.state.selected && !this.state.selectedSegmentId &&
          <>
            <TripDetailPage 
              trip={this.state.selected} 
              onClick={this.handleSegmentSelect}
            />
          </>
        }

        {this.state.selected && this.state.selectedSegmentId &&
          <TripSegmentDetailPage 
            id={this.state.selectedSegmentId} 
            trip={this.state.selected} 
          />
        }

      </Drawer>
    );
  }
}

export default App;
