const { Client } = require('pg');

const sql = `
  insert into trip_segment(
    trip_id, location_type, name, long_description, short_description,
    arrival_time, departure_time, accommodation_id, location_text
  ) VALUES(
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9, $10
  ) returning id
`;

const client = new Client();
client.connect();


const post = async (inputs) => {
  if (!inputs) return;
  const data = await client
    .query(sql, [
      inputs.trip_id,
      inputs.location_type,
      inputs.name,
      inputs.long_description,
      inputs.short_description,
  
      inputs.arrival_time,
      inputs.departure_time,
      inputs.accommodation_id || null,
      inputs.location_text,
    ])
    .catch(e => console.error(e.stack))

  if (data.rows[0].id) {
    return { success: true, ...data.rows[0] };
  } else {
    return { success: false, id: null };
  }
}

module.exports = post;