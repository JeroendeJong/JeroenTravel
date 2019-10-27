import React from 'react';
import map from './map';
import { getCurrentStoreSnapshot } from './store/store';
import styled from 'styled-components';
import { setGeometrySelected } from './store/emit';
import Flight from './models/flight';
import { coordinatesToBounds, centreOnBounds } from './map/utils';

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
          const bounds = coordinatesToBounds(extentCoords);
          centreOnBounds(bounds);

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