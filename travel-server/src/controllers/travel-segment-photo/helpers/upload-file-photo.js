const {Storage} = require('@google-cloud/storage');
  
const GOOGLE_CLOUD_PROJECT_ID = 'geolocationproje-1545946456975'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = './private/google-cloud-storage-key.json'; // Replace with the path to the downloaded private key

const storage =  new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

const uploadFileStream = (dataToUpload) => {
  const bucketName = 'jeroen-travel-images';
  const bucket = storage.bucket(bucketName);

  const fileToUpload = dataToUpload.file

  const gcsFileName = fileToUpload.name;
  const bucketfile = bucket.file(`${gcsFileName}`);

  const streamOptions = {
    metadata: {
      contentType: fileToUpload.mimetype,
    }
  }

  const uploadPublicURL = `https://storage.googleapis.com/${bucket.name}/${bucketfile.name}`;

  return new Promise(function(resolve, reject) {
    bucketfile
      .createWriteStream(streamOptions)
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', (success) => {
        resolve({success: true, url: uploadPublicURL});
      })
      .end(fileToUpload.data);
  });
};

module.exports = uploadFileStream