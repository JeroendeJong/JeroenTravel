import mapboxgl from 'mapbox-gl';
import interactionsSetup from './interactions';
import { FLIGHTS_DATA_SOURCE_ID, AIRPORTS_DATA_SOURCE_ID, FLIGHTS_DATA_ID, AIRPORTS_DATA_ID, TRAVEL_DATA_SOURCE_ID, TRAVEL_DATA_ID } from './data';
import {airportLocationLayer, flightPathLayer, airportTextNameLayer, travelPointSegment, travelLineSegment} from './layers';
import Airport from '../models/airport';
import Flight from '../models/flight';

mapboxgl.accessToken = 'pk.eyJ1IjoieTBneiIsImEiOiJjaW9scWxsNzIwMDMxdzVtNm56MHhweGdjIn0.XrmaYtqwrszezXe9y-gBuw';

class Map {
  public map: mapboxgl.Map | null = null;
  private selected: { type: string; id: any; } | null = null;
  private dataQueue: {flights?: any, airports?: any, travel?: any} = {};
  private loaded: boolean = false;

  public create() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [1.44, 45.77],
      zoom: 3.5,
      hash: false
    });

    map.on('styledata', () => {
      this.loaded = true;
      if (this.dataQueue) {
        const flightSource = this.map!.getSource(FLIGHTS_DATA_SOURCE_ID);
        const flightData = this.dataQueue.flights;
        if (flightData && !flightSource) this.setFlightLayer(flightData);

        const airportSource = this.map!.getSource(AIRPORTS_DATA_SOURCE_ID);
        const airportData = this.dataQueue.airports;
        if (airportData && !airportSource) this.setAirportLayer(airportData);
      }
    })

    this.map = map;
    (window as any).map = map;

    interactionsSetup(map);
  }

  public setGeometryExclusivityFilter(flightOrAirport: Flight | Airport | null): void {
    if (flightOrAirport === null && this.selected !== null) {
      const {id, type} = this.selected;
      const source = type === 'flight' ? FLIGHTS_DATA_SOURCE_ID : AIRPORTS_DATA_SOURCE_ID;
      this.map!.setFeatureState({id, source}, {selected: false});

      this.map!.setFilter(FLIGHTS_DATA_ID, undefined);
      this.map!.setFilter(AIRPORTS_DATA_ID, undefined);

      this.selected = null;
      return;
    }

    if (flightOrAirport === null) return;

    const baseFlightObject = flightOrAirport.data;
    if (Airport.isAirport(baseFlightObject)) {
      this.handleAirportExclusivity(flightOrAirport);
    }
    else if (Flight.isFlight(baseFlightObject)) {
      this.handleFlightExclusivity(flightOrAirport);
    }
  }

  private handleAirportExclusivity(airport: Airport) {
    const id = airport!.data.id;
    this.map!.setFilter(AIRPORTS_DATA_ID, ['==', ['get', 'id'], id]);
    this.map!.setFilter(AIRPORTS_DATA_ID + '2', ['==', ['get', 'id'], id]);
    
    this.map!.setFilter(FLIGHTS_DATA_ID, [
      'any',
      ['==', ['get', 'arrival_id'], id],
      ['==', ['get', 'departure_id'], id]
    ]);

    this.selected = { type: 'flight', id };
  }

  private handleFlightExclusivity(flight: Flight) {
    const id = flight!.data.id;
    this.map!.setFeatureState({id, source: FLIGHTS_DATA_SOURCE_ID}, {selected: true});
    this.map!.setFilter(FLIGHTS_DATA_ID, ['==', ['get', 'id'], id])

    const {arrival_id, departure_id} = flight.data;
    const filter = [
      'any',
      ['==', ['get', 'id'], arrival_id],
      ['==', ['get', 'id'], departure_id]
    ];

    this.map!.setFilter(AIRPORTS_DATA_ID, filter)
    this.map!.setFilter(AIRPORTS_DATA_ID + '2', filter);

    this.selected = { type: 'airport', id };
  }

  public setFlightLayer(data: any) {
    if (!this.loaded) {
      this.dataQueue.flights = data;
      return;
    }

    this.map!.addSource(FLIGHTS_DATA_SOURCE_ID, {
      type: 'geojson',
      data: data as any
    });

    this.map!.addLayer(flightPathLayer);
  }

  public clearFlightLayer() {
    this.map!.removeLayer(FLIGHTS_DATA_ID);
    this.map!.removeSource(FLIGHTS_DATA_SOURCE_ID);
  }

  public setAirportLayer(data: any) {
    if (!this.loaded) {
      this.dataQueue.airports = data;
      return;
    }

    this.map!.addSource(AIRPORTS_DATA_SOURCE_ID, {
      type: 'geojson',
      data: data as any
    });

    this.map!.addLayer(airportLocationLayer);
    this.map!.addLayer(airportTextNameLayer);
  }

  public clearAirportLayer() {
    this.map!.removeLayer(AIRPORTS_DATA_ID);
    this.map!.removeLayer(AIRPORTS_DATA_ID + '2');
    this.map!.removeSource(AIRPORTS_DATA_SOURCE_ID);
  }

  public setTravelLayer(url: string) {
    if (!this.loaded) {
      this.dataQueue.travel = url;
      return;
    }

    this.map!.addSource(TRAVEL_DATA_SOURCE_ID, {
      type: 'geojson',
      data: url
    });

    this.map!.addLayer(travelPointSegment);
    this.map!.addLayer(travelLineSegment);
  }

  public clearTravelLayer() {
    try {
      this.map!.removeLayer(TRAVEL_DATA_ID + '__point');
      this.map!.removeLayer(TRAVEL_DATA_ID + '__line');
      this.map!.removeSource(TRAVEL_DATA_SOURCE_ID);
    } catch {
      console.log('Layers don\'t exist. Most likely due to lack of connectivity.');
    }
  }

  public clearAll() {
    if (this.loaded) {
      try {
        this.clearAirportLayer();
        this.clearFlightLayer();
        this.clearTravelLayer();
      } catch {
        console.log('fail');
      }
    } else {
      return new Error('Nothing to clear');
    }
  }
}

export default new Map();