import React from 'react';
import Flight from '../models/flight';
import styled from 'styled-components';


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
  color: #ffa600;
`;

const FlightOtherDetails = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
  margin-right: 10px;
`;

const BottomAnchor = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 10px;
`;

const FlightOtherDetailItem = styled.span`
  color: lightgray;
`;

const HorizontalSeperationLine = styled.p`
  width: 100%;
  height: 1px;
  background-color: gray;
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
        <FlightOtherDetails>
          <FlightOtherDetailItem>
            {flight.data.code}
          </FlightOtherDetailItem>
          <FlightOtherDetailItem>
            {flight.data.operator_name}
          </FlightOtherDetailItem>
        </FlightOtherDetails>
      </BottomAnchor>


    </ContentContainer>
  )
}

export default FlightContent;