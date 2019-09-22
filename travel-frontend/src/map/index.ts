import mapboxgl from 'mapbox-gl';
import interactionsSetup from './interactions';
import { FLIGHTS_DATA_SOURCE_ID, AIRPORTS_DATA_SOURCE_ID, FLIGHTS_DATA_ID, AIRPORTS_DATA_ID } from './data';

mapboxgl.accessToken = 'pk.eyJ1IjoieTBneiIsImEiOiJjaW9scWxsNzIwMDMxdzVtNm56MHhweGdjIn0.XrmaYtqwrszezXe9y-gBuw';

class Map {
  public map: mapboxgl.Map | null = null;

  constructor() {
  }

  public create() {
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      hash: true
    });

    this.map = map;
    (window as any).map = map;

    interactionsSetup(map);
  }

  public setFlightLayer(data: any) {
    this.map!.addSource(FLIGHTS_DATA_SOURCE_ID, {
      type: 'geojson',
      data: data as any
    });

    this.map!.addLayer({
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

  public setAirportLayer(data: any) {
    this.map!.addSource(AIRPORTS_DATA_SOURCE_ID, {
      type: 'geojson',
      data: data as any
    });

    this.map!.addLayer({
      id: AIRPORTS_DATA_ID,
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


    this.map!.addLayer({
      id: AIRPORTS_DATA_ID + '2',
      type: "symbol",
      source: AIRPORTS_DATA_SOURCE_ID,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 10,
      }
    });
  }
}

export default new Map();