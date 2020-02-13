const { Client } = require('pg');

const sql = `
  select 
    ts.id, 
    ts.location_type,
    ts.location_text, 
    ts.name, 
    ts.short_description, 
    ts.arrival_time, 
    ts.departure_time, 
    ts.posted_time, 
    acco.name as accomodation_name
  from trip_segment as ts
  left join accommodation as acco on (ts.accommodation_id = acco.id)
  where trip_id = $1 
  order by arrival_time asc
`;

const client = new Client();
client.connect();
const get = async (id) => {
  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))

  const stuff = data.rows.map(row => {
    return {
      id: row.id,
      location_type: row.location_type,
      location_text: row.location_text,
      name: row.name,
      short_description: row.short_description,
      long_description: row.long_description,
      arrival_time: row.arrival_time,
      departure_time: row.departure_time,
      posted_time: row.posted_time,
      photos: row.photos,
      accomodation: {
        name: row.accomodation_name,
        address: row.accomodation_address,
        review: row.accomodation_review,
        place: row.accomodation_place
      }
    }
  });

  return stuff
}

module.exports = get;