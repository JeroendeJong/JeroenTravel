import React from 'react';
import TripOverviewItem, { TripOverview } from './trips-item';
import ScrollableView from '../common/scroll-view';

interface ComponentProps {
  trips: TripOverview[];
  onClick: (trip: TripOverview) => void;
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


export default TripListScreen;