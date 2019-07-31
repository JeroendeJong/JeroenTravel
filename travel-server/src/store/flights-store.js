const {arcify} = require('../utils');

const heathrow = [-0.4564842, 51.4700223];
const beijing = [116.3582828, 40.0916234];
const seoul = [126.4385017, 37.4601908];
const busan = [128.9457124, 35.1675524];

const mumbai = [72.8634204, 19.0895595];
const hongKong = [113.8976097, 22.3089622];

const helsinki = [24.9506664, 60.3210416];
const copenhagen = [12.6485688, 55.6180236];

const groningen = [6.5793998, 53.1232821];

const flights = [
  // Korea Trip
  arcify(heathrow, beijing),
  arcify(beijing, seoul),
  arcify(busan, beijing),
  arcify(beijing, heathrow),

  // Backpacking trip
  arcify(heathrow, mumbai),
  arcify(mumbai, hongKong),
  arcify(helsinki, copenhagen),
  arcify(copenhagen, groningen),
]


module.exports = flights;