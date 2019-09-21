

export const FLIGHTS_DATA_SOURCE_ID = 'flights-data-source';
export const AIRPORTS_DATA_SOURCE_ID = 'aiport-data-source';
export const FLIGHTS_DATA_ID = 'flight-data-layer';
export const AIRPORT_DATA_ID = 'airport-data-layer';

function dataSetup(map: mapboxgl.Map) {

  map.addSource(FLIGHTS_DATA_SOURCE_ID, {
    type: 'geojson',
    data: 'http://localhost:8080/flights/list'
  });

  map.addSource(AIRPORTS_DATA_SOURCE_ID, {
    type: 'geojson',
    data: 'http://localhost:8080/airports/list'
  });
  
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

  map.addLayer({
    id: AIRPORT_DATA_ID,
    type: "circle",
    source: AIRPORTS_DATA_SOURCE_ID,
    paint: {
      'circle-radius': {
        'base': 2,
        'stops': [[12, 3], [22, 180]]
        },
      'circle-color': '#e55e5e'
    }
  });
}

export default dataSetup;