import { setGeometrySelected } from "../store/emit";
import Flight from "../models/flight";
import Airport from "../models/airport";

const handleClick = (e: any) => {
  console.log(e);

  const map = e.target;
  const features = map.queryRenderedFeatures(e.point);
  
  if (!features) return;
  if (features && features.length === 0) return;

  const feature = features[0];

  if (Flight.isFlight(feature.properties)) {
    const flight = new Flight(feature.properties);
    setGeometrySelected(flight);
  } 
  else if (Airport.isAirport(feature.properties)) {
    const airport = new Airport(feature.properties);
    setGeometrySelected(airport);
  }
  else {
    setGeometrySelected(null);
  }
};

function interactionsSetup(map: mapboxgl.Map) {
  map.on('click', handleClick)
}

export default interactionsSetup;