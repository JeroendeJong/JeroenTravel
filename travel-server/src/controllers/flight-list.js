const {arcify} = require('../utils');
const { Client } = require('pg');

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
    code,
    'flight' as type
  from flight
`;

const client = new Client();
const get = async () => {

  client.connect();
  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))

  const formattedAsFeature = data.rows.map(row => {
    const start = JSON.parse(row.depature_geom).coordinates;
    const end = JSON.parse(row.arrival_geom).coordinates;
    
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