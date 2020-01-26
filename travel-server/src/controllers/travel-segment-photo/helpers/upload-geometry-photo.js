const { Client } = require('pg');
const ExifReader = require('exifreader');
const DmsCoordinates = require("dms-conversion");

const sql = `
  insert into trip_segment_photos(
    link_id, description, trip_segment_id, geom
  ) VALUES(
    $1, $2, $3, st_makepoint($4,$5)
  ) returning id
`;

const client = new Client();
client.connect();

function parseLongitude(exifData) {
  const longArray = exifData.GPSLongitude.value;
  const longOrigin = exifData.GPSLongitudeRef.value[0];
  const longitude = `${longArray[0]}°${longArray[1]}'${longArray[2]}"${longOrigin}`;
  return DmsCoordinates.parseDms(longitude);
}

function parseLatitude(exifData) {
  const latArray = exifData.GPSLatitude.value;
  const latOrigin = exifData.GPSLatitudeRef.value[0];
  const latitude = `${latArray[0]}°${latArray[1]}'${latArray[2]}"${latOrigin}`;
  return DmsCoordinates.parseDms(latitude);
}

const extractAndUploadPhotoMetadata = async (data) => {
  const {file, segmentAttachId} = data;
  const output = ExifReader.load(file.data);

  const longitude = parseLongitude(output)
  const latitude = parseLatitude(output);

  const result = await client
    .query(sql, [
      `/${file.name}`, 
      "A photo", 
      segmentAttachId, 
      longitude, latitude
    ])
    .catch(e => console.error(e.stack))

  const id = result.rows[0].id;
  return id;
}

module.exports = extractAndUploadPhotoMetadata;