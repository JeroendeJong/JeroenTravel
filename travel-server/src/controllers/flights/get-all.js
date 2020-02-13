const {arcify} = require('../../utils');
const { Client } = require('pg');

const sql = `
select
  flight.id,
  dep_airport.id as departure_id,
	dep_airport.name as departure_airport_name,
	dep_airport.iata_code as departure_iata_code,
	st_asgeojson(dep_airport.geom) as departure_geom,

  arr_airport.id as arrival_id,
	arr_airport.name as arrival_airport_name,
	arr_airport.iata_code as arrival_iata_code,
	st_asgeojson(arr_airport.geom) as arrival_geom,

	(select name from flight_operator where id = operator_link_id) as operator_name,
	flight.datetime_departure,
  flight.datetime_arrival,
  flight.code,
	flight.status,
	st_asgeojson(st_envelope(ST_union(dep_airport.geom, arr_airport.geom))) as extent,
	'flight' as type
from flight
join airport as dep_airport on (dep_airport.id = flight.airport_departure_link_id)
join airport as arr_airport on (arr_airport.id = flight.airport_arrival_link_id);
`;

const client = new Client();
client.connect();

const get = async () => {

  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))

  const formattedAsFeature = data.rows.map(row => {
    const start = JSON.parse(row.departure_geom).coordinates;
    const end = JSON.parse(row.arrival_geom).coordinates;
    
    row.extent = JSON.parse(row.extent);

    return {
      type: 'Feature', 
      id: row.id,
      properties: row,
      geometry: arcify(start, end).geometry
    };
  });

  return {
    type: 'FeatureCollection',
    features: formattedAsFeature
  }
}

module.exports = get;