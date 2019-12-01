
const GetAllTrips = require('./get-all');
const GetOneTrip = require('./get-one');
const CreateTrip = require('./create');
const DeleteTrip = require('./delete');
const { check, validationResult } = require('express-validator');
function setup(app) {

  app.get('/travel/trips',async (req, res) => {
    const data = await GetAllTrips();
    res.send(JSON.stringify(data));
  });

  app.get('/travel/trips/:id', async (req, res) => {
    const {id} = req.params;
    const data = await GetOneTrip(id);
    res.send(JSON.stringify(data));
  });

  app.delete('/travel/trips/:id', async (req, res) => {
    const {id} = req.params;
    const data = await DeleteTrip(id);
    res.send(JSON.stringify(data));
  });


  app.post('/travel/trips', [
    check('name').isString(),
    check('description').isString(),
    check('country_codes').isString(),
    check('header_image_url').isString(),
    check('active').isBoolean()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const result = await CreateTrip(req.body);
    res.send(JSON.stringify(result));
  });


}

module.exports = setup;
