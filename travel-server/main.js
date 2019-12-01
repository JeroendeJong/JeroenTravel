// makes use of .env files for env variables possible.
require('dotenv').config();

const express = require('express');
const FlightsListController = require('./src/controllers/flight-list');
const AirportsListController = require('./src/controllers/flight-airport-list');
const FlightsStatisticsController = require('./src/controllers/flight-stats');

const TravelTripGeometryController = require('./src/controllers/travel-trip-geometry');
const TravelTripLastKnowLocationController = require('./src/controllers/travel-trip-last-active-location');

const TravelTripsSetup = require('./src/controllers/travel-trips/routes');
const TravelSegmentSetup = require('./src/controllers/travel-segment/routes');

const PORT = 8080;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, DELETE")
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use( express.json() ); 

app.get('/flights/list', async (req, res) => {
  const data = await FlightsListController();
  res.send(JSON.stringify(data));
})

app.get('/airports/list/', async (req, res) => {
  const data = await AirportsListController();
  res.send(JSON.stringify(data));
});

app.get('/flights/stats', async (req, res) => {
  const stats = await FlightsStatisticsController();
  res.send(JSON.stringify(stats));
});

app.get('/travel/trip/:id/lastlocation', async (req, res) => {
  const {id} = req.params;
  const location = await TravelTripLastKnowLocationController(id);
  res.send(JSON.stringify(location));
});

app.get('/travel/trip/geometry/:id', async (req, res) => {
  const {id} = req.params;
  const tripData = await TravelTripGeometryController(id);
  res.send(JSON.stringify(tripData));
});

console.log(app)
// Setup various endpoints
TravelTripsSetup(app);
TravelSegmentSetup(app);

app.listen(PORT);