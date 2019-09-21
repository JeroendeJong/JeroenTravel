import { FLIGHTS_DATA_ID, FLIGHTS_DATA_SOURCE_ID } from "./data";
import { setFlightSelected } from "./store/emit";
import Flight from "./models/flight";

let hoveredStateId: any =  null;

function interactionsSetup(map: mapboxgl.Map) {
  map.on('mousemove', FLIGHTS_DATA_ID, (e) => {
    if (!e.features) return;
    if (e.features && e.features.length === 0) return;
  
    if (hoveredStateId) {
      map.setFeatureState({source: FLIGHTS_DATA_SOURCE_ID, id: hoveredStateId}, { hover: false});
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState({source: FLIGHTS_DATA_SOURCE_ID, id: hoveredStateId}, { hover: true});
  
    document.getElementById('map')!.style.cursor = 'pointer';
  });


  map.on('click', FLIGHTS_DATA_ID, (e) => {
    if (!e.features) return;
    if (e.features && e.features.length === 0) return;

    const feature = e.features[0];
  
    map.setFeatureState({source: FLIGHTS_DATA_SOURCE_ID, id: hoveredStateId}, { selected: true});

    // const featureData = {
    //   data: feature.properties
    // };

    const isFlight = Flight.isFlight(feature.properties)
    if (isFlight) {
      const flight = new Flight(feature.properties);
      setFlightSelected(flight);
    } 
    
    // could be airport as well. 
  })
  
  map.on("mouseleave", FLIGHTS_DATA_ID, function() {
    if (hoveredStateId) {
      map.setFeatureState({source: FLIGHTS_DATA_SOURCE_ID, id: hoveredStateId}, { hover: false});
    }
    hoveredStateId =  null;
    document.getElementById('map')!.style.cursor = 'inherit';
  });
}

export default interactionsSetup;