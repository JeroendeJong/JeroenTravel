const { Client } = require('pg');

const sql = `
select 
	ts.id, 
  ts.location_type,
  ts.location_text, 
	ts.name, 
	ts.short_description, 
	ts.long_description, 
	ts.arrival_time, 
	ts.departure_time, 
	ts.header_image_url, 
	ts.posted_time, 
	acco.name as accomodation_name,
	acco.address as accomodation_address,
	acco.review as accomodation_review,
	acco.place as accomodation_place
from trip_segment as ts
left join accommodation as acco on (ts.accommodation_id = acco.id)
where trip_id = $1 
order by arrival_time asc
`;

const client = new Client();
const get = async (id) => {

  client.connect();
  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))


  return data.rows.map(row => {
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
      accomodation: {
        name: row.accomodation_name,
        address: row.accomodation_address,
        review: row.accomodation_review,
        place: row.accomodation_place
      }
    }
  });
}

module.exports = get;