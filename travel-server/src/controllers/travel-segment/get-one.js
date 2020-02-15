const { Client } = require('pg');

const sql = `
  select 
    ts.id, 
    ts.name,
    location_type, 
    location_text, 
    long_description, 
    arrival_time, 
    departure_time, 
    posted_time, 
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
      )from trip_segment_photos where trip_segment_id = $1
    ) as photos,
    
    json_build_object(
      'id', acco.id,
      'name', acco.name,
      'review', acco.review,
      'place', acco.place
    ) as accomodation,

    st_asgeojson(extent) as extent

  from trip_segment as ts
  left join accommodation as acco on (ts.accommodation_id = acco.id)
  where ts.id = $1
`;

const client = new Client();
client.connect();
const get = async (id) => {
  const segment = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))

  const tripSegment = segment.rows[0];

  tripSegment.extent = JSON.parse(tripSegment.extent);
  return tripSegment
}

module.exports = get;