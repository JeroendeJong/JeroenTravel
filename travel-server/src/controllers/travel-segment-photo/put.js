
const databaseInsertGeometryForPhoto = require('./helpers/upload-geometry-photo');
const uploadPhotoToGCPStorage = require('./helpers/upload-file-photo')

const putTravelImage = (data) => {
  const photoId = await databaseInsertGeometryForPhoto(data);
  const photoUploadSuccess = await uploadPhotoToGCPStorage(data).catch(e => {
    console.log(e);
  });

  if (typeof photoId === 'number' && !photoUploadSuccess.success) {
    return { 
      success: false, 
      error: 'photo upload failed, geometry upload success',
    };
  }

  if (typeof photoId !== 'number' && photoUploadSuccess.success) {
    return { 
      success: false, 
      error: 'photo upload success, geometry upload failed',
      imageUrl: photoUploadSuccess.url
    };
  }

  if (typeof photoId === 'number' && photoUploadSuccess.success) {
    return { success: true, imageUrl: photoUploadSuccess.url };
  } else {
    return { success: false };
  }
}

module.exports = putTravelImage;