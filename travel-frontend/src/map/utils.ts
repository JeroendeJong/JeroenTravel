
import map from './index';
import mapboxgl from 'mapbox-gl';
import {isMobile} from '../mobile';
import drawerStore from '../UI/common/drawer-store';

const CENTRE_PADDING_MOBILE = 20;
const CENTRE_PADDING_DESKTOP = 80;

const ACTIVE_LOCATION_OFFSET = 40;

interface BoundCalculationOptions {
  activeUserLocation: boolean;
}

const getDesktopWidth = () => {
  const width = window.innerWidth * 0.5;
  if (width < 400) return 400;
  if (width > 700) return 700;
  return width ;
}

const getMobileHeight = () => {
  const isDrawerActive = drawerStore.active;
  if (isDrawerActive) {
    return window.innerHeight * 0.66;
  } 
  return window.innerHeight * 0.33;
}

export const centreOnBounds = (bounds: mapboxgl.LngLatBounds, options?: BoundCalculationOptions) => {
  let rightOffset = 0;

  if (options?.activeUserLocation) {
    rightOffset += ACTIVE_LOCATION_OFFSET;
  }

  const drawerSize = isMobile() 
    ? getMobileHeight()
    : getDesktopWidth()

  if (isMobile()) {
    map.map!.fitBounds(bounds, {padding: {
      bottom: drawerSize + CENTRE_PADDING_MOBILE, 
      top: CENTRE_PADDING_MOBILE, 
      right: CENTRE_PADDING_MOBILE + rightOffset, 
      left: CENTRE_PADDING_MOBILE
    }});
  } else {
    map.map!.fitBounds(bounds, {padding: {
      bottom: CENTRE_PADDING_DESKTOP, 
      top: CENTRE_PADDING_DESKTOP, 
      right: CENTRE_PADDING_DESKTOP + rightOffset, 
      left: drawerSize + CENTRE_PADDING_DESKTOP
    }});
  }
}

export const coordinatesToBounds = (coordinates: any) => {
  const bounds = coordinates.reduce((bounds: any, coord: number[]) => {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  return bounds;
}