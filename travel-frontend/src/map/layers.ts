import { FLIGHTS_DATA_SOURCE_ID, AIRPORTS_DATA_SOURCE_ID, FLIGHTS_DATA_ID, AIRPORTS_DATA_ID, TRAVEL_DATA_SOURCE_ID, TRAVEL_DATA_ID } from './data';

export const flightPathLayer: mapboxgl.Layer = {
  id: FLIGHTS_DATA_ID,
  type: "line",
  source: FLIGHTS_DATA_SOURCE_ID,
  layout: {
    "line-join": "round",
    "line-cap": "round"
  },
  paint: {
    "line-color": [ 
      'match', 
      ['get', 'status'],
      'completed', 'green',
      'pending', 'gray',
      /* other */ '#ccc'
    ],
    "line-opacity": 0.3,
    "line-width": 1
  }
};

export const airportLocationLayer: mapboxgl.Layer = {
  id: AIRPORTS_DATA_ID,
  type: "circle",
  source: AIRPORTS_DATA_SOURCE_ID,
  paint: {
    'circle-radius': {
      'base': 2,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': '#e55e5e',
    'circle-opacity': 1,
  }
};

export const airportTextNameLayer: mapboxgl.Layer = {
  id: AIRPORTS_DATA_ID + '2',
  type: "symbol",
  source: AIRPORTS_DATA_SOURCE_ID,
  paint: {
    'text-color': 'white'
  },
  layout: {
    'text-field': ['get', 'name'],
    'text-size': 10,
  }
}

export const travelPointSegment: mapboxgl.Layer = {
  id: TRAVEL_DATA_ID + '__point',
  type: "circle",
  source: TRAVEL_DATA_SOURCE_ID,
  filter: [ 
    "any",
    ["==", ["geometry-type"], "Point"]
  ],
  paint: {
    'circle-radius': {
      'base': 2,
      'stops': [[12, 3], [22, 180]]
    },
    'circle-color': '#e55e5e',
    'circle-opacity': 1,
  }
}

export const travelLineSegment: mapboxgl.Layer = {
  id: TRAVEL_DATA_ID + '__line',
  type: "line",
  source: TRAVEL_DATA_SOURCE_ID,
  filter: [ 
    "any",
    ["==", ["geometry-type"], "LineString"]
  ],
  layout: {
    "line-join": "round",
    "line-cap": "round"
  },
  paint: {
    "line-color": [
      'match',
      ['get', 'type'],
      'bus', '#e55e5e',
      'taxi', 'green',
      'walk', 'pink',
      /* other */ '#ccc'
    ],
    "line-opacity": 0.9,
    "line-width": 3
  }
}