// makes use of .env files for env variables possible.
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const { Client } = require('pg');


const BASE_URL = 'http://localhost:8080'

function writePromiseToFile(promise, name) {
  promise.then(res => {
    const dest = fs.createWriteStream(name);
    res.body.pipe(dest);
  }).catch(e => console.log(e))
}

const getSegmentURL = (id) => `${BASE_URL}/travel/trip-segment/${id}`;
const getTripUrl = (id) => `${BASE_URL}/travel/trip/${id}`;
const getLastLocationTripUrl = (id) => `${BASE_URL}/travel/trip/${id}/lastlocation`;
const getTripOverviewURL = () => `${BASE_URL}/travel/trips`;
const getTripGeometry = () => `${BASE_URL}/travel/trip/geometry/all`;

const client = new Client();
client.connect();



// setup
const BASE_DIR = 'scrape/output';
if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR);

const TRIP_BASE_DIR = 'scrape/output/trip';
if (!fs.existsSync(TRIP_BASE_DIR)) fs.mkdirSync(TRIP_BASE_DIR);

const SEGMENT_BASE_DIR = 'scrape/output/trip-segment';
if (!fs.existsSync(SEGMENT_BASE_DIR)) fs.mkdirSync(SEGMENT_BASE_DIR);

const GEOMETRY_BASE_DIR = 'scrape/output/trip-geometry';
if (!fs.existsSync(GEOMETRY_BASE_DIR)) fs.mkdirSync(GEOMETRY_BASE_DIR);

(async () => {

  writePromiseToFile(
    fetch(getTripOverviewURL()),
    'scrape/output/trips.json'
  );

  writePromiseToFile(
    fetch(getTripGeometry()),
    'scrape/output/trip-geometry/all.json'
  );

  const allTripSegmentIDs = await client
    .query(`select id from trip_segment`)
    .catch(e => console.error(e.stack));

    allTripSegmentIDs.rows.forEach(tripSegmentId => writePromiseToFile(
      fetch(getSegmentURL(tripSegmentId.id)),
      `scrape/output/trip-segment/${tripSegmentId.id}.json`
    ))

  const allTripIDs = await client
    .query(`select id from trips`)
    .catch(e => console.error(e.stack));

  allTripIDs.rows.forEach(tripId => {
    const TRIP_ID_BASE_DIR = `scrape/output/trip/${tripId.id}`;
    if (!fs.existsSync(TRIP_ID_BASE_DIR)) fs.mkdirSync(TRIP_ID_BASE_DIR);

    writePromiseToFile(
      fetch(getTripUrl(tripId.id)),
      `scrape/output/trip/${tripId.id}/trip.json`
    )

    writePromiseToFile(
      fetch(getLastLocationTripUrl(tripId.id)),
      `scrape/output/trip/${tripId.id}/lastlocation.json`
    );
  })

  client.end();

})()



// fetch('')
