const { Client } = require('pg');

const sql = `

`;

const client = new Client();
client.connect();


const create = async (inputs) => {
  if (!inputs) return;


  console.log(inputs)
}

module.exports = create;