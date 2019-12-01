import { useEffect } from 'react';
import map from '../../map';
import { getTravelTripGeometry } from '../../constants';
import withTripsData from './with-trips-data';
import { withRouter } from 'react-router';
import {coordinatesToBounds, centreOnBounds} from '../../map/utils';

const TripGeometryRenderer = (props: any) => {
  useEffect(() => {
    const trip = props.trip;
    const coords: any = trip.extent.coordinates[0];
    const bounds = coordinatesToBounds(coords);
    centreOnBounds(bounds);
    map.setTravelLayer(getTravelTripGeometry(trip.id));
    return () => {
      map.clearTravelLayer();
    }
  }, []);

  return null;
}

export default withRouter(withTripsData(TripGeometryRenderer));



