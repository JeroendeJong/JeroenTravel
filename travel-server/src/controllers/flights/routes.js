const FlightsListController = require('./get-all');

function setup(app) {

  app.get('/flights/list', async (req, res) => {
    const data = await FlightsListController();
    res.send(JSON.stringify(data));
  });

}

module.exports = setup;
