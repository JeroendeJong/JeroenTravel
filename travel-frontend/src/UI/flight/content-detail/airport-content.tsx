import React from 'react';
import Airport from '../../../models/airport';
import styled from 'styled-components';
import { BottomAnchor, HorizontalSeperationLine, OtherDetails, OtherDetailItem } from './common';

interface ComponentProps {
  airport: Airport;
}

const WebLink = styled.a`
  text-decoration: none;
  color: ${p => p.theme.color.primary};
`;

const AirportName = styled.div`
  text-align: center;
  font-size: 25px;
`;

const ContentContainer = styled.div`
  position: relative;
  height: 100%;
`;

const AirportContent: React.SFC<ComponentProps> = ({airport}: ComponentProps) => {
  const {data} = airport;
  return (
    <ContentContainer>
      <AirportName>{data.name}</AirportName>
      <BottomAnchor>
          <HorizontalSeperationLine/>
          <OtherDetails>
            <OtherDetailItem>
              {data.iata_code}
            </OtherDetailItem>
            <OtherDetailItem>
              <WebLink href={data.home_link} target="_blank" rel="noopener noreferrer">
                Website
              </WebLink>
            </OtherDetailItem>
            <OtherDetailItem>
              {data.municipality}
            </OtherDetailItem>
          </OtherDetails>
        </BottomAnchor>
    </ContentContainer>
  )
}


export default AirportContent;