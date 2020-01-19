const { Client } = require('pg');
const ExifReader = require('exifreader');
const {uploadFileStream} = require('./upload-file-photo');

const sql = `
  insert into trip_segment_photos(
    link_id, description, trip_segment_id, geom
  ) VALUES(
    $1, $2, $3, st_makepoint($4,$5)
  ) returning id
`;

const client = new Client();
client.connect();


const extractAndUploadPhotoMetadata = async (data) => {
  const {file, segmentAttachId} = data;

  const output = ExifReader.load(file.data);
  const long = output.GPSLongitude.description
  const lat = output.GPSLatitude.description

  const result = await client
    .query(sql, [
      `/assets/${file.name}`, 
      "A photo", 
      segmentAttachId, 
      lat, long
    ])
    .catch(e => console.error(e.stack))

  const id = result.rows[0].id;
  return id;
}

module.exports = extractAndUploadPhotoMetadata;