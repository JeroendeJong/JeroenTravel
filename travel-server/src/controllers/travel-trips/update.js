const { Client } = require('pg');

const sql = `
  insert into trips(name, description, country_codes, header_image_url, active) 
  VALUES($1, $2, $3, $4, $5)
`;

const client = new Client();
client.connect();

const post = async (inputs) => {
  if (!inputs) return;
  const data = await client
    .query(sql, [
      inputs.name,
      inputs.description,
      inputs.country_codes,
      inputs.header_image_url,
      inputs.active
    ])
    .catch(e => console.error(e.stack))
  return { success: true };
}

module.exports = post;