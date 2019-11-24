import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import map from '../../map';
import { getTravelTripLastKnowLocation } from '../../constants';
import styled from 'styled-components';
import withTripsData from './with-trips-data';
import { withRouter } from 'react-router';

const LastLocationTextBox = styled.div`
  background: white;
  border-radius: 10px;
  
  width: max-content;
  margin-left: 25px;
  padding-left: 5px;
  margin-top: -2px;
  padding-right: 5px;
`;

const UserLocationMarker = (props: any) => {
  let marker: mapboxgl.Marker | null = null;

  const locationElement = useRef(null);

  useEffect(() => {
    const tripID = props.trip.id;
    fetch(getTravelTripLastKnowLocation(tripID))
      .then(resp => resp.json())
      .then(json => {
        const coords: [number, number] = json.coordinates;
        const el: HTMLDivElement = locationElement.current!;

        el.classList.add('mapboxgl-user-location-dot');

        // locationElement.current
        console.log(el);
        marker = new mapboxgl.Marker(el)
          .setLngLat(coords)
          .addTo(map.map!);

        console.log(marker)
        
        });


    return () => {
      if (marker) marker.remove()
    }
  }, []);


  return (
    <span>
      <div ref={locationElement}>
        <LastLocationTextBox>
          Last Location
        </LastLocationTextBox>
      </div>
    </span>
  );
}

export default withRouter(withTripsData(UserLocationMarker));
