
const GetAllTripSegmentsByTripReferenceId = require('./get-all-by-trip-reference');
const CreateTripSegment = require('./create');
const GetOneTripSegment = require('./get-one');
const { check, validationResult } = require('express-validator');

function setup(app) {

  app.get('/travel/trip/:id', async (req, res) => {
    const {id} = req.params;
    const tripData = await GetAllTripSegmentsByTripReferenceId(id);
    res.send(JSON.stringify(tripData));
  });

  app.get('/travel/trip-segment/:id', async (req, res) => {
    const {id} = req.params;
    const tripData = await GetOneTripSegment(id);
    res.send(JSON.stringify(tripData));
  });

  app.post('/travel/trip/:id', [
    check('name').isString(),
    check('trip_id').isNumeric(),
    check('location_type').isString(),
    check('location_text').isString(),
    check('short_description').isString(),
    check('long_description').isString(),
    check('arrival_time').isISO8601(),
    check('departure_time').isISO8601(),
    check('accommodation_id')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const result = await CreateTripSegment(req.body, req.id);
    res.send(JSON.stringify(result));
  });

}

module.exports = setup;
