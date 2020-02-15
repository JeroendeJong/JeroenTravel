import React from 'react';
import styled from 'styled-components';
import RaceFinishLineIcon from '../../../icons/race-finish-line';

const TheEndCircle = styled.div`
  position: absolute;
  left: 8px;
  margin-top: 10px;

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${p => p.theme.color.primary};
`;

const TripEndTimeLineLine = styled.div`
  width: 2px !important;
  min-width: 2px;
  height: 20px;
  background-color: ${p => p.theme.color.primary};
`;

const TheEndContainer = styled.div`
  display: flex;

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
    <TripEndTimeLineLine/>
    <TheEndCircle/>

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