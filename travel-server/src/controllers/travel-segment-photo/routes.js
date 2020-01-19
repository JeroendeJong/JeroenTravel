
const databaseInsertGeometryForPhoto = require('./upload-geometry-photo');
const uploadPhotoToGCPStorage = require('./upload-file-photo')

function setup(app) {

  app.put('/upload/photo', async (req, res) => {
    if (!req.files) {
      return res.send(JSON.stringify({error: "No file or invalid file send"}));
    }

    if (!req.query.segment_id) {
      return res.send(JSON.stringify({error: "make sure to add ?segment_id=x."}));
    }

    const {file} = req.files
    const segmentAttachId = req.query.segment_id;

    const data = {file, segmentAttachId};

    const photoId = await databaseInsertGeometryForPhoto(data);
    const photoUploadSuccess = await uploadPhotoToGCPStorage(data).catch(e => {
      console.log(e);
    })


    if (typeof photoId === 'number' && !photoUploadSuccess.success) {
      return res.send(JSON.stringify({ 
        success: false, 
        error: 'photo upload failed, geometry upload success',
      }));
    }

    if (typeof photoId !== 'number' && photoUploadSuccess.success) {
      return res.send(JSON.stringify({ 
        success: false, 
        error: 'photo upload success, geometry upload failed',
        imageUrl: photoUploadSuccess.url
      }));
    }

    if (typeof photoId === 'number' && photoUploadSuccess.success) {
      res.send(JSON.stringify({ success: true, imageUrl: photoUploadSuccess.url }));
    } else {
      res.send(JSON.stringify({ success: false }));
    }
  });
}

module.exports = setup;
