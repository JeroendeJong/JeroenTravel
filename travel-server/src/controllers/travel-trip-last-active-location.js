const { Client } = require('pg');

const sql = `
with last_trip_segment as (
	select * 
	from trip_segment 
	where trip_id = $1
	order by arrival_time desc
	limit 1
)

select
  CASE 
    WHEN ts.accommodation_id is null THEN
      ST_asgeojson(ST_Endpoint(tsg.geom))
    ELSE
      ST_asgeojson(acco.geom)
  END as lllocation
from last_trip_segment as ts
join trip_segment_geometry as tsg on (trip_segment_id = ts.id)
left join accommodation as acco on (ts.accommodation_id = acco.id)
`;

const client = new Client();
client.connect();
const get = async (id) => {

  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))


  if (data.rows[0]) {
    return JSON.parse(data.rows[0].lllocation);
  } else {
    return {}
  }
}

module.exports = get;