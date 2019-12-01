const { Client } = require('pg');

const sql = `

`;

const client = new Client();
client.connect();
const get = async () => {

  const data = await client
    .query(sql)
    .catch(e => console.error(e.stack))

  const rowData = data.rows.map(row => {
    return {...row, extent: JSON.parse(row.extent)}
  });

  return rowData;
}

module.exports = get;