const { Client } = require('pg');

const sql = `
  select 
    tsg.id, ST_asgeojson(geom) as geom, tsg.type, trip_segment_id 
  from trip_segment_geometry as tsg
  join trip_segment as ts on (trip_segment_id = ts.id)
  where ts.trip_id = $1;
`;

const client = new Client();
client.connect();
const get = async (id) => {

  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))

  const formattedAsFeature = data.rows.map(row => {
    const geometry = JSON.parse(row.geom);

    delete row.geom;
    delete row.id;

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