import React, { useEffect, useState } from 'react';
import { getTravelTrips } from '../../constants';
import TravelStore from './travel-store';

const withTripsData = (Component: any) => (props: any) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const cache = TravelStore.get('trips');
    if (cache) {
      setData(cache);
      return;
    }

    fetch(getTravelTrips())
      .then(resp => resp.json())
      .then(json => {
        setData(json);
        TravelStore.set('trips', json);
      });
  }, []);

  if (!data) return null;

  const urlparams = props.match.params;
  const dataProps: any = {};

  dataProps.trips = data;

  if(urlparams.tripID) {
    const numericTripId = parseInt(urlparams.tripID, 10);
    dataProps.trip = data!.find((trip: any) => trip.id === numericTripId);
  }

  return <Component {...props } {...dataProps}/>;
};


export default withTripsData;