const { Client } = require('pg');

const sql = `
  select id, type, name, short_description, long_description, arrival_time, departure_time, header_image_url
  from trip_segment 
  where trip_id = $1 
  order by arrival_time asc
`;

const client = new Client();
const get = async (id) => {

  client.connect();
  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))


  return data.rows;
}

module.exports = get;