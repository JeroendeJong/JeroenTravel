const { Client } = require('pg');

const sql = `
  select
    trips.id,
    trips.name,
    trips.description,
    trips.country_codes,
    trips.header_image_url,
    trips.active,
    st_asgeojson(trips.extent) as extent,
    min(segment.arrival_time) start_date, 
    max(segment.departure_time) end_date
  from trips
  left join trip_segment as segment on (
    trips.id = segment.trip_id
  ) where trips.id = $1
  group by trips.id;
`;

const client = new Client();
client.connect();
const get = async (id) => {
  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))

  const rowData = data.rows.map(row => {
    return {...row, extent: JSON.parse(row.extent)}
  });

  return rowData[0];
}

module.exports = get;