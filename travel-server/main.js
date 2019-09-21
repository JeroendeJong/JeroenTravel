// makes use of .env files for env variables possible.
require('dotenv').config();

const express = require('express');
const FlightsListController = require('./src/controllers/flight-list');
const AirportsListController = require('./src/controllers/airport-list');
const FlightsStatisticsController = require('./src/controllers/flight-stats');



const PORT = 8080;


const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/flights/list', async (req, res) => {
  const data = await FlightsListController();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
})

app.get('/airports/list/', async (req, res) => {
  const data = await AirportsListController();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});



app.get('/flights/stats', async (req, res) => {
  const stats = await FlightsStatisticsController();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(stats));
});

app.listen(PORT);