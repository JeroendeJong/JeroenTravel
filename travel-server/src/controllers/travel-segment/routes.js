
const GetAllTripSegments = require('./get-all');
// const { check, validationResult } = require('express-validator');
function setup(app) {

  app.get('/travel/trip/:id', async (req, res) => {
    console.log(req);
    const {id} = req.params;
    const tripData = await GetAllTripSegments(id);
    res.send(JSON.stringify(tripData));
  });

}

module.exports = setup;
