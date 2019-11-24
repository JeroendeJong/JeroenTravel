// makes use of .env files for env variables possible.
require('dotenv').config();

const express = require('express');
const FlightsListController = require('./src/controllers/flight-list');
const AirportsListController = require('./src/controllers/flight-airport-list');
const FlightsStatisticsController = require('./src/controllers/flight-stats');

const TravelTripDetailController = require('./src/controllers/travel-trip-detail');
const TravelTripsController = require('./src/controllers/travel-trips');
const TravelTripGeometryController = require('./src/controllers/travel-trip-geometry');
const TravelTripLastKnowLocationController = require('./src/controllers/travel-trip-last-active-location');
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

app.get('/travel/trip/:id', async (req, res) => {
  const {id} = req.params;
  const tripData = await TravelTripDetailController(id);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tripData));
});

app.get('/travel/trip/:id/lastlocation', async (req, res) => {
  const {id} = req.params;
  const location = await TravelTripLastKnowLocationController(id);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(location));
});

app.get('/travel/trip/geometry/:id', async (req, res) => {
  const {id} = req.params;
  const tripData = await TravelTripGeometryController(id);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tripData));
});

app.get('/travel/trips', async (req, res) => {
  const tripData = await TravelTripsController();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tripData));
});

app.listen(PORT);