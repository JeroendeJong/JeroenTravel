import React from 'react';
import styled from 'styled-components';
import RaceFinishLineIcon from '../../../icons/race-finish-line';

const TheEndContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const TheEndIconTextcontainer = styled(TheEndContainer)`
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const TheEndText = styled.p`
  margin: auto;
`;

const TimelineEndInActiveTrip = () => (
  <TheEndContainer>
    <TheEndIconTextcontainer>
      <RaceFinishLineIcon/>
      <TheEndText>
        <span>Thanks for following my trip. </span>
        <br/>
        <span>Back home now, but I am sure as hell already preparing for the my next adventure. </span>
        <br/>
        <span>Stay Tuned.</span>
      </TheEndText>
    </TheEndIconTextcontainer>
  </TheEndContainer>
);

export default TimelineEndInActiveTrip;