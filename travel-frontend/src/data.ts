

export const FLIGHTS_DATA_SOURCE_ID = 'flights-data-source';
export const FLIGHTS_DATA_ID = 'flights-data-layer';

function dataSetup(map: mapboxgl.Map) {

  map.addSource(FLIGHTS_DATA_SOURCE_ID, {
    type: 'geojson',
    data: 'http://localhost:8080/flights/list'
  })
  
  
  map.addLayer({
    id: FLIGHTS_DATA_ID,
    type: "line",
    source: FLIGHTS_DATA_SOURCE_ID,
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": 'green',
      "line-opacity": 0.3,
      "line-width": 1
    }
  });
}

export default dataSetup;