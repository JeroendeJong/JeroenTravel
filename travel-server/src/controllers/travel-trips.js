const { Client } = require('pg');

const sql = `
  select id, name, description, country_codes, header_image_url, active from trips;
`;

const client = new Client();
const get = async () => {

  client.connect();
  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))

  return data.rows;
}

module.exports = get;