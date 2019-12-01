const { Client } = require('pg');

const sql = `
select 
  (
    select array_agg(
      json_build_object(
        'id', id,
        'link_id', link_id,
        'description', description,
        'geom', json_build_object(
          'type', 'Point',
          'coordinates', json_build_array(
            ST_x(geom),
            ST_y(geom)
          )
        )
      ) 
    )from trip_segment_photos where trip_segment_id = 9
  ) as photos,
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

const imagesSql = `
  select * from trip_segment_photos where trip_segment_id = $1
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