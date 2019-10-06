const { Client } = require('pg');

const sql = `
  select id, type, name, ST_asGeojson(geom) as geom, description, arrival_time, departure_time, header_image_url
  from trip_segment where trip_id = $1
`;

const client = new Client();
const get = async (id) => {

  client.connect();
  const data = await client
    .query(sql, [id])
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