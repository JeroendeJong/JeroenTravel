import { setGeometrySelected } from "../store/emit";
import Flight from "../models/flight";
import Airport from "../models/airport";
import map from './index';

const handleClick = (e: any) => {
  const mapboxMap = e.target;
  const features = mapboxMap.queryRenderedFeatures(e.point);
  
  const reset = () => {
    setGeometrySelected(null);
    map.setGeometryExclusivityFilter(null);
  }

  if (!features) return reset();
  if (features && features.length === 0) return reset();

  const feature = features[0];

  if (Flight.isFlight(feature.properties)) {
    const flight = new Flight(feature.properties);
    setGeometrySelected(flight);
    map.setGeometryExclusivityFilter(flight);
  } 
  else if (Airport.isAirport(feature.properties)) {
    const airport = new Airport(feature.properties);
    setGeometrySelected(airport);
    map.setGeometryExclusivityFilter(airport);
  }
  else return reset();
};

function interactionsSetup(map: mapboxgl.Map) {
  map.on('click', handleClick)
}

export default interactionsSetup;