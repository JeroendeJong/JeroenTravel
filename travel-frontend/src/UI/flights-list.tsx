import React from 'react';
import { getCurrentStoreSnapshot } from "../store/store";
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
`;

const FlightContainer = styled.tr`
  align-items: center;

  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const AirportCode = styled.th`
  font-size: 20px;
  color: white;
`;

const OperatorCode = styled.th`
  font-size: 14px;
  color: ${p => p.theme.color.primaryBase};
`

const FlightsList = (props: any) => {
  const storeState = getCurrentStoreSnapshot();

  const flightsGeoJson = storeState.data && storeState.data.flights;
  if (!flightsGeoJson) return null;

  const rows = (flightsGeoJson as any).features.map((flight: any) => {
    const data = flight.properties;
    return (
      <FlightContainer key={data.id}>
        <AirportCode>{data.departure_iata_code}</AirportCode>
        <OperatorCode>{data.code}</OperatorCode>
        <AirportCode>{data.arrival_iata_code}</AirportCode>
      </FlightContainer>
    )
  });

  return <TableContainer>{rows}</TableContainer>

}

export default FlightsList;