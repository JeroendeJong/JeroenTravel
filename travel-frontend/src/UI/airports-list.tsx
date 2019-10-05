import React from 'react';
import { getCurrentStoreSnapshot } from "../store/store";
import styled from 'styled-components';
import withAirportAction from '../with-airport-action';

const Container = styled.div`
  margin: 10px;
  margin-left: 20px;
  color: ${p => p.theme.color.white};
  :hover {
    color: ${p => p.theme.color.primary};
  }
`;


const AirportItem = (props: {id: string, name: string}) => (
  <Container key={props.id}>
    <span>{props.name}</span>
  </Container>
);

const Stuff = withAirportAction(AirportItem);

const AirportList = (props: any) => {
  const storeState = getCurrentStoreSnapshot();

  const flightsGeoJson = storeState.data && storeState.data.airports;
  if (!flightsGeoJson) return null;

  const rows = (flightsGeoJson as any).features.map((airport: any) => {
    const data = airport.properties;
    return (
      <Stuff key={data.id} id={data.id} name={data.name}/>
    )
  });

  return <div>{rows}</div>

}

export default AirportList;