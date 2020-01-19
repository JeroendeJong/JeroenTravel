// makes use of .env files for env variables possible.
require('dotenv').config();

const express = require('express');
const AirportsListController = require('./src/controllers/flight-airport-list');
const FlightsStatisticsController = require('./src/controllers/flight-stats');

const TravelTripLastKnowLocationController = require('./src/controllers/travel-trip-last-active-location');

const TravelTripsSetup = require('./src/controllers/travel-trips/routes');
const TravelSegmentSetup = require('./src/controllers/travel-segment/routes');
const TravelGeometrySetup = require('./src/controllers/travel-geometry/routes');
const TravelSegmentPhotoSetup = require('./src/controllers/travel-segment-photo/routes');
const FlightsSetup = require('./src/controllers/flights/routes');

const PORT = 8080;
const fileupload = require("express-fileupload");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH, DELETE, PUT")
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use( fileupload() );
app.use( express.json() ); 

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

FlightsSetup(app);

// Setup various endpoints
TravelTripsSetup(app);
TravelSegmentSetup(app);
TravelSegmentPhotoSetup(app);
TravelGeometrySetup(app);

app.listen(PORT);