import React from 'react';
import TripOverviewItem, { TripOverview } from './trip-overview-item';
import ScrollableView from '../common/scroll-view';


interface ComponentProps {
  trips: TripOverview[];
  onClick: (trip: TripOverview) => void;
}

const TripListScreen = (props: ComponentProps) => {

  const activeTrip = props.trips.find(trip => trip.active);  
  console.log(activeTrip);

  let activeTopTrip = null;

  if (activeTrip) {
    activeTopTrip = (
      <div>
        <TripOverviewItem active={true} tripOverview={activeTrip} onClick={props.onClick} key={activeTrip.id}/>
      </div>
    )
  }

  console.log(activeTopTrip)


  const triplist = props.trips.map(trip => {
    if (trip.active) return;
    return <TripOverviewItem tripOverview={trip} onClick={props.onClick} key={trip.id}/>
  });

  console.log(triplist);

  return (
    <ScrollableView>
      {activeTopTrip}
      {triplist}
    </ScrollableView>
  )
}


export default TripListScreen;