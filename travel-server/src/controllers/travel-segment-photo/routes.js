
function setup(app) {

  app.put('/upload/photo', async (req, res) => {
    if (!req.files) {
      return res.send(JSON.stringify({error: "No file or invalid file send"}));
    }

    if (!req.query.segment_id) {
      return res.send(JSON.stringify({error: "Make sure to add ?segment_id query paramter"}));
    }

    const {file} = req.files
    const segmentAttachId = req.query.segment_id;
  
    const data = {file, segmentAttachId};
    const succesJSONresponse = putTravelImage(data);
    res.send(JSON.stringify(succesJSONresponse));
  });
}

module.exports = setup;
