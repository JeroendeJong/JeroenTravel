const { Client } = require('pg');

const sql = `
  delete from trips
  where id = $1 returning *
`;

const client = new Client();
client.connect();
const get = async (id) => {

  const data = await client
    .query(sql, [id])
    .catch(e => console.error(e.stack))

  console.log(data);

  return data.rows[0];
}

module.exports = get;