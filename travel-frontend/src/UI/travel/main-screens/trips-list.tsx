import React from 'react';
import TripOverviewItem, { TripOverview } from '../trips-item';
import ScrollableView from '../../common/scroll-view';
import withTripsData from '../with-trips-data';
import { RouterPathChangeRequest } from '../models/router-path-change-request';
import { withRouter } from 'react-router';

interface ComponentProps {
  trips: TripOverview[];
  onClick: (trip: RouterPathChangeRequest) => void;
}

const TripListScreen = (props: ComponentProps) => {
  const activeTrip = props.trips.find(trip => trip.active);  

  let activeTopTrip = null;

  if (activeTrip) {
    activeTopTrip = (
      <TripOverviewItem active={true} tripOverview={activeTrip} onClick={props.onClick} key={activeTrip.id}/>
    )
  }

  const triplist = props.trips.map(trip => {
    if (trip.active) return null;
    return <TripOverviewItem tripOverview={trip} onClick={props.onClick} key={trip.id}/>
  });

  return (
    <ScrollableView>
      {activeTopTrip}
      {triplist}
    </ScrollableView>
  )
}


export default withRouter(withTripsData(TripListScreen));