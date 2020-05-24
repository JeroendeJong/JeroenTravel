const putTravelImage = require('./put');

function setup(app) {

  app.put('/upload/photo', async (req, res) => {

    console.log(req.body);
    if (!req.files || !req.body.filename) {
      return res.send(JSON.stringify({error: "No file or invalid file send"}));
    }
    if (!req.query.segment_id) {
      return res.send(JSON.stringify({error: "Make sure to add ?segment_id query paramter"}));
    }

    const {file} = req.files
    const filename = req.body.filename;
    const segmentAttachId = req.query.segment_id;
  
    const data = {file, segmentAttachId, filename};
    const succesJSONresponse = putTravelImage(data);
    res.send(JSON.stringify(succesJSONresponse));
  });
}

module.exports = setup;
