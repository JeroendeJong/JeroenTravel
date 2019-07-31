import mapboxgl from 'mapbox-gl';
import interactionsSetup from './interactions';
import dataSetup from './data';
import App from './UI/App';
import ReactDOM from 'react-dom';
import React from 'react';


mapboxgl.accessToken = 'pk.eyJ1IjoieTBneiIsImEiOiJjaW9scWxsNzIwMDMxdzVtNm56MHhweGdjIn0.XrmaYtqwrszezXe9y-gBuw';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
  center: [-74.50, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
  hash: true
});

(window as any).map = map;

interactionsSetup(map);

map.on('style.load', function () {
  dataSetup(map);
});

ReactDOM.render((
  <App/>
), document.getElementById('root'));