import React from 'react';
import { getCurrentStoreSnapshot } from "../store/store";
import styled from 'styled-components';
import withFlightAction from '../with-flight-action';

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

  :hover {
    cursor: pointer;
  }
`;

const ClickableCode = withFlightAction(OperatorCode);

const FlightsList = (props: any) => {
  const storeState = getCurrentStoreSnapshot();

  const flightsGeoJson = storeState.data && storeState.data.flights;
  if (!flightsGeoJson) return null;

  const rows = (flightsGeoJson as any).features.map((flight: any) => {
    const data = flight.properties;
    return (
      <FlightContainer key={flight.id}>
        <AirportCode>{data.departure_iata_code}</AirportCode>
        <ClickableCode id={flight.id}>{data.code}</ClickableCode>
        <AirportCode>{data.arrival_iata_code}</AirportCode>
      </FlightContainer>
    )
  });

  return (
    <TableContainer>
      <tbody>{rows}</tbody>
    </TableContainer>
  )

}

export default FlightsList;