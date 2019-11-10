import React from 'react';
import map from '.';
import { getCurrentStoreSnapshot } from '../store/store';
import { isMobile } from '../mobile';
import styled from 'styled-components';
import { setGeometrySelected } from '../store/emit';
import Airport from '../models/airport';


const ActionStyle = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const withAirportAction = (WrappedComponent: any) => {
  return class extends React.Component<any> {
    private handleClick = () => {
      const store = getCurrentStoreSnapshot();

      const json: any = store.data && store.data.airports;
      if (json) {
        const features = json.features;
        const clickedAirport = features.filter((port: any) => port.id === this.props.id);

        if (clickedAirport.length > 0) {
          const airportFeature = clickedAirport[0];

          if (isMobile()) {
            map!.map!.easeTo({center: airportFeature.geometry.coordinates, offset: [0, -100], zoom: 8});
          } else {
            map!.map!.easeTo({center: airportFeature.geometry.coordinates, offset: [150, 0]});
          }
          
          const cls = new Airport(airportFeature.properties);
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

export default withAirportAction;