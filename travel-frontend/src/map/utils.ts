
import map from './index';
import mapboxgl from 'mapbox-gl';
import {isMobile} from '../mobile';

export const centreOnBounds = (bounds: mapboxgl.LngLatBounds) => {
  if (isMobile()) {
    map.map!.fitBounds(bounds, {padding: {
      bottom: 350, 
      top: 20, 
      right: 20, 
      left: 20
    }});
  } else {
    map.map!.fitBounds(bounds, {padding: {
      bottom: 60, 
      top: 60, 
      right: 60, 
      left: 430
    }});
  }
}

export const coordinatesToBounds = (coordinates: any) => {
  const bounds = coordinates.reduce((bounds: any, coord: number[]) => {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  return bounds;
}