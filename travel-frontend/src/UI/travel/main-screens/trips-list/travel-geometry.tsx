import { useEffect } from 'react';
import withTripsData from '../../with-trips-data';
import { withRouter } from 'react-router';
import map from '../../../../map';
import { getTravelTripGeometries } from '../../../../constants';
import { coordinatesToBounds, centreOnBounds } from '../../../../map/utils';

const TravelGeometry = (props: any) => {
  useEffect(() => {
    console.log(props.trip);
    if (props.trip) {
      const trip = props.trip;
      if (!trip.extent?.coordinates) return;

      const coords: any = trip.extent.coordinates[0];
      const bounds = coordinatesToBounds(coords);
      centreOnBounds(bounds, {activeUserLocation: trip.active});
    }
    if (map.hasTravelLayer()) return;
    map.setTravelLayer(getTravelTripGeometries());
  }, [props.trip]);

  return null;
}

export default withRouter(withTripsData(TravelGeometry));



