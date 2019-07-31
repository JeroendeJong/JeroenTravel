const turf = require('@turf/turf');

const STEP_COUNT = 500;

function arcify(pointA, pointB) {
  const routeFeature = {
    type: "Feature",
    id: (Math.random() * 1000).toString(),
    geometry: {
      type: "LineString",
      coordinates: [
        pointA,
        pointB
      ]
    }
  };

  const distance = turf.lineDistance(routeFeature, {unit: 'kilometers'});
  const arcArray = [];
  for (var i = 0; i < distance; i += distance / STEP_COUNT) {
    var segment = turf.along(routeFeature, i, {unit: 'kilometers'});
    arcArray.push(segment.geometry.coordinates);
  }
  
  const newFeature = {...routeFeature};
  newFeature.geometry.coordinates = arcArray;
  return newFeature;
}


module.exports = {
  arcify
};