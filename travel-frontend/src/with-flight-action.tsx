import React from 'react';
import map from './map';
import { getCurrentStoreSnapshot } from './store/store';
import { isMobile } from './mobile';
import styled from 'styled-components';
import { setGeometrySelected } from './store/emit';
import mapboxgl from 'mapbox-gl';
import Flight from './models/flight';

const ActionStyle = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const withFlightAction = (WrappedComponent: any) => {
  return class extends React.Component<any> {
    private handleClick = () => {
      const store = getCurrentStoreSnapshot();

      const json: any = store.data && store.data.flights;
      if (json) {
        const features = json.features;
        const clickedFlight = features.filter((port: any) => port.id === this.props.id);

        if (clickedFlight.length > 0) {
          const flightFeature = clickedFlight[0];

          const extentCoords = flightFeature.properties.extent.coordinates[0];

          const bounds = extentCoords.reduce(function(bounds: any, coord: any) {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(extentCoords[0], extentCoords[0]));
          
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
          const cls = new Flight(flightFeature.properties);
          setGeometrySelected(cls);
          map.setGeometryExclusivityFilter(cls);
        }
      }
    }

    render() {
      return (
        <ActionStyle onClick={this.handleClick}>
          <WrappedComponent {...this.props}/>
        </ActionStyle>
      );
    }
  };
};

export default withFlightAction;