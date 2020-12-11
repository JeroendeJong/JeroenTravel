const { Client } = require('pg');

const sql = `
  UPDATE trip_segment
  SET 
    location_type = $1, 
    name = $2,
    long_description = $3,
    short_description = $4,
    arrival_time = $5,
    departure_time = $6,
    accommodation_id = $7,
    location_text = $8
  WHERE id = $9;
`;

const client = new Client();
client.connect();

const edit = async (inputs) => {
  if (!inputs) return;

  const data = await client
    .query(sql, [
      inputs.location_type,
      inputs.name,
      inputs.long_description,
      inputs.short_description,
      inputs.arrival_time,
      inputs.departure_time,
      inputs.accommodation_id || null,
      inputs.location_text,

      //where
      inputs.id,
    ])
    .catch(e => console.error(e.stack))

  if (data.rows[0]) {
    return { success: true, ...data.rows[0] };
  } else {
    return { success: false, id: null };
  }
}

module.exports = edit;