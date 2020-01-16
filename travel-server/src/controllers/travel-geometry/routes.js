
const getOneTravelGeometry = require('./get-one');
const getAllTravelGeometry = require('./get-all');

function setup(app) {

  app.get('/travel/trip/geometry/all', async (req, res) => {
    const tripData = await getAllTravelGeometry();
    res.send(JSON.stringify(tripData));
  });

  app.get('/travel/trip/geometry/:id', async (req, res) => {
    const {id} = req.params;
    const tripData = await getOneTravelGeometry(id);
    res.send(JSON.stringify(tripData));
  });


}

module.exports = setup;
