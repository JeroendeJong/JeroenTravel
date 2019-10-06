import React from 'react';
import Flight from '../../../models/flight';
import styled from 'styled-components';
import { BottomAnchor, HorizontalSeperationLine, OtherDetails, OtherDetailItem } from './common';


interface ComponentProps {
  flight: Flight
}

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
`;

const FlightAirportNames = styled.p`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const FlightAirportName = styled.span`
  font-size: 30px;
  color: ${p => p.theme.color.primary};
`;

const FlightContent: React.SFC<ComponentProps> = ({flight}: ComponentProps) => {
  return (
    <ContentContainer> 
      <FlightAirportNames>
        <FlightAirportName>
          {flight.data.departure_iata_code} 
        </FlightAirportName>
        <FlightAirportName>
          {flight.data.arrival_iata_code}
        </FlightAirportName>
      </FlightAirportNames>

      <BottomAnchor>
        <HorizontalSeperationLine/>
        <OtherDetails>
          <OtherDetailItem>
            {flight.data.code}
          </OtherDetailItem>
          <OtherDetailItem>
            {flight.data.operator_name}
          </OtherDetailItem>
        </OtherDetails>
      </BottomAnchor>

    </ContentContainer>
  )
}

export default FlightContent;