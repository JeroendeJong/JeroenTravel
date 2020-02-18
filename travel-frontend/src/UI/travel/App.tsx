import React from 'react';
import TripDetailPage from './main-screens/segments-list/main';
import TripListScreen from './main-screens/trips-list/main';
import { TRAVEL_ROUTE, TRAVEL_TRIP_SEGMENT_ROUTE, TRAVEL_TRIP_ROUTE } from '../../routes';
import TripSegmentDetailPage from './main-screens/trip-segment';
import { Route, withRouter } from 'react-router';
import { RouterPathChangeRequest } from './models/router-path-change-request';
import UserLocationMarker from './trip-location-renderer';
import withTripsData from './with-trips-data';
import { TripOverview } from './types';

import TravelGeometry from './main-screens/trips-list/travel-geometry';
import TabComponent from '../common/drag-drawer';

interface ComponentState {
  selected: null | TripOverview;
  trips: any[];
  selectedSegmentId: null | number;
};

class App extends React.Component<any, ComponentState> {
  public state: ComponentState = {
    selected: null,
    trips: [],
    selectedSegmentId: null
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

  private handlePathChange = (payload: RouterPathChangeRequest) => {
    let path = ''
    if (payload.tripId) {
      path += `/trip/${payload.tripId}`;
    }

    if (payload.segmentId) {
      path += `/segment/${payload.segmentId}`;
    }

    this.props.history.push(path);
  }

  public render(): any {
    return (
      // <Drawer 
      //   onCloseContentId={this.handleContentCloseCall} 
      //   onBackContentId={this.handleContentBackCall}
      // >
        <TabComponent>

          <Route exact path={TRAVEL_ROUTE}>
            <TravelGeometry/>
            <TripListScreen onClick={this.handlePathChange}/>
          </Route>

          <Route path={TRAVEL_TRIP_ROUTE}>
            <TravelGeometry/>
            <UserLocationMarker/>

            <Route exact path={TRAVEL_TRIP_ROUTE}>
              <TripDetailPage onClick={this.handlePathChange}/>
            </Route>

            <Route exact path={TRAVEL_TRIP_SEGMENT_ROUTE}>
              <TripSegmentDetailPage 
                id={this.state.selectedSegmentId!} 
                trip={this.state.selected!} 
              />
            </Route>

          </Route>
        </TabComponent>
    );
  }
}

export default withRouter(withTripsData(App));
