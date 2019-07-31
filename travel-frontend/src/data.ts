

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
      "line-color": [
        "case", ["boolean", ["feature-state", "hover"],  false ],
        'green',
        '#003f5c'
      ],
      "line-width": [
        "case", ["boolean", ["feature-state", "hover"],  false ],
        8,
        4
      ]
    }
  });
}

export default dataSetup;