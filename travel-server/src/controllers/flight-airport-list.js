const { Client } = require('pg');

const sql = `
select id, type as airport_type, name, municipality, iata_code, home_link, ST_asGeoJSON(geom) as geom, 'airport' as type from (
	select airport_departure_link_id as airport_link_id from flight
	union
	select airport_arrival_link_id as airport_link_id from flight
) as visited join airport as a on (a.id = visited.airport_link_id)
`;

const client = new Client();
client.connect();

const get = async () => {

  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))

  const formattedAsFeature = data.rows.map(row => {
    const geometry = JSON.parse(row.geom);
    delete row.geom;

    return {
      type: 'Feature', 
      id: row.id,
      properties: row,
      geometry
    };
  });

  return {
    type: 'FeatureCollection',
    features: formattedAsFeature
  }
}

module.exports = get;