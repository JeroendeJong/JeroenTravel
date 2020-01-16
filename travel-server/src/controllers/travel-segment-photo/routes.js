
const getOneTravelGeometry = require('./get-one');
const getAllTravelGeometry = require('./get-all');

function setup(app) {

  app.post('/upload/photo', async (req, res) => {
    const tripData = await getAllTravelGeometry();
    res.send(JSON.stringify(tripData));
  });


}

module.exports = setup;
