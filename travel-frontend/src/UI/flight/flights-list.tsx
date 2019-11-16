import React from 'react';
import { getCurrentStoreSnapshot } from "../../store/store";
import styled from 'styled-components';
import withFlightAction from '../../map/with-flight-action';

const FlightContainer = styled.div`
  align-items: center;

  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  margin-top: 5px;

  display: flex;
  justify-content: space-between;
`;

const AirportCode = styled.span`
  font-size: 20px;
  color: ${p => p.theme.color.text};
`;

const OperatorCode = styled.span`
  font-size: 14px;
  color: ${p => p.theme.color.primary};

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
        <div style={{display: 'grid'}}>
          <AirportCode>{data.departure_iata_code}</AirportCode>
          <AirportCode>{data.arrival_iata_code}</AirportCode>
        </div>
        <ClickableCode id={flight.id}>{data.code}</ClickableCode>
      </FlightContainer>
    )
  });

  return (
    <div>
      {rows}
    </div>
  )

}

export default FlightsList;