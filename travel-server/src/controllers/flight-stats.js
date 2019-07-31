const { Client } = require('pg');
const client = new Client();
const sql = `
  select 
    id,
    
    (select name from airport where id = airport_departure_link_id) as depature_airport_name,
    (select iata_code from airport where id = airport_departure_link_id) as departure_iata_code,
    datetime_departure,
    (select st_asGeoJson(geom) from airport where id = airport_departure_link_id) as depature_geom,
    
    (select name from airport where id = airport_arrival_link_id) as arrival_airport_name,
    (select iata_code from airport where id = airport_arrival_link_id) as arrival_iata_code,
    datetime_arrival,
    (select st_asGeoJson(geom) from airport where id = airport_arrival_link_id) as arrival_geom,
    
    (select name from flight_operator where id = operator_link_id) as operator_name,
    code
  from flight
`;


const getSortedAirportByVisits = (flights, type) => {
  const countObject = {};

  for (let idx = 0; idx < flights.length; idx++) {
    const el = flights[idx];
    const code = el[type];

    if (countObject[code]) countObject[code]++
    else countObject[code] = 1;
  }

  return countObject;
}

const getSortedArrivalAirportByVisits = (flights) => getSortedAirportByVisits(flights, 'arrival_iata_code')
const getSortedDepartureAirportByVisits = (flights) => getSortedAirportByVisits(flights, 'departure_iata_code')
const getSortedAirportByTotalVisits = () => {
  const arr = getSortedArrivalAirportByVisits();
  const dep = getSortedDepartureAirportByVisits();

  return null;
}



const get = async () => {

  client.connect();
  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))


  const flights = data.rows;

  return {
    departureAirportCount: getSortedDepartureAirportByVisits(flights),
    arrivalAirportCount: getSortedArrivalAirportByVisits(flights)
  };
}



module.exports = get;