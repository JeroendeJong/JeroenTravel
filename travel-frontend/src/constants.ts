import { resolveDevelopmentURL } from "./UI/utils";

const nodeEnv = process.env.NODE_ENV;
const isDEV = nodeEnv === 'development';

export const getFlightListURL = () => {
  if (isDEV) return `${resolveDevelopmentURL()}/flights/list`;
  return '/cache/flight-list.json';
}

export const getAirportListURL = () => {
  if (isDEV) return `${resolveDevelopmentURL()}/airports/list`;
  return '/cache/airport-list.json';
}

export const getStatisticsURL = () => {
  if (isDEV) return '${resolveDevelopmentURL()}/flights/stats';
  return '/cache/stats.json';
}

export const getTravelTrip = (id: number) => {
  if (isDEV) return `${resolveDevelopmentURL()}/travel/trip/${id}`;
  return `/cache/trip/${id}/trip.json`;
}

export const getTravelSegment = (id: number) => {
  if (isDEV) return `${resolveDevelopmentURL()}/travel/trip-segment/${id}`;
  return `/cache/trip-segment/${id}.json`;
}

export const getTravelTripLastKnowLocation = (id: number) => {
  if (isDEV) return `${getTravelTrip(id)}/lastlocation`;
  return `/cache/trip/${id}/lastlocation.json`;
}

export const getTravelTripGeometry = (id: number | string) => {
  if (isDEV) return `${resolveDevelopmentURL()}/travel/trip/geometry/${id}`;
  return `/cache/trip-geometry/${id}.json`;
}
export const getTravelTripGeometries = () => {
  return getTravelTripGeometry('all');
}

export const getTravelTrips = () => {
  if (isDEV) return `${resolveDevelopmentURL()}/travel/trips`;
  return `/cache/trips.json`;
}

export const getImageUrl = (path: string) => {
  return `https://storage.googleapis.com/jeroen-travel-images${path}`
}