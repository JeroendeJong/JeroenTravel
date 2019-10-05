

const nodeEnv = process.env.NODE_ENV;
const isDEV = nodeEnv === 'development';

export const getFlightListURL = () => {
  if (isDEV) return 'http://localhost:8080/flights/list';
  return '/cache/flight-list.json';
}

export const getAirportListURL = () => {
  if (isDEV) return 'http://localhost:8080/airports/list';
  return '/cache/airport-list.json';
}

export const getStatisticsURL = () => {
  if (isDEV) return 'http://localhost:8080/flights/stats';
  return '/cache/stats.json';
}