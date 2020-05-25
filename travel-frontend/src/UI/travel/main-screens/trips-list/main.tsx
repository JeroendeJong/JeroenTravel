import React, { useEffect } from 'react';
import TripOverviewItem from './trip-item';
import ScrollableView from '../../../common/scroll-view';
import withTripsData from '../../with-trips-data';
import { RouterPathChangeRequest } from '../../models/router-path-change-request';
import { withRouter } from 'react-router';
import { TripOverview } from '../../types';
import drawerStore from '../../../common/drawer-store';
import { SmallHeaderTitle } from '../../title-header-scroll';
import { HorizontalSeperationLine } from '../../../common/horizontal-seperation-line';

interface ComponentProps {
  trips: TripOverview[];
  onClick: (trip: RouterPathChangeRequest) => void;
}

const TripListScreen = (props: ComponentProps) => {
  const activeTrip = props.trips.find(trip => trip.active);  

  useEffect(() => {
    drawerStore.setTopContent(
      <SmallHeaderTitle>Jeroen Travel</SmallHeaderTitle>
    );
  }, []);

  let activeTopTrip = null;

  if (activeTrip) {
    activeTopTrip = (
      <TripOverviewItem active={true} tripOverview={activeTrip} onClick={props.onClick} key={activeTrip.id}/>
    )
  }

  const triplist = props.trips.map(trip => {
    if (trip.active) return null;
    if (!trip.extent || !trip.start_date) return null;
    return (
      <>
        <HorizontalSeperationLine styleType={'Faint'}/>
        <TripOverviewItem tripOverview={trip} onClick={props.onClick} key={trip.id}/>
      </>
    )
  });

  return (
    <ScrollableView>
      {activeTopTrip}
      {triplist}
    </ScrollableView>
  )
}


export default withRouter(withTripsData(TripListScreen));