import React from 'react';
import styled, { keyframes } from 'styled-components';
import hikingIcon from '../../../../../img/trekking.svg';

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
  width: 100%;
`;

const pulsatingIcon = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  70% {
    opacity: 0.09;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`;

const IconContainerItem = styled.div`
  margin: auto;
  position: relative;
`;

const PulsatingIcon = styled(IconContainerItem)`
  position: absolute;
  left: 8px;
  margin-top: 10px;

  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${p => p.theme.color.primary};

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: ${p => p.theme.color.primary};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    transform: scale(0.5);
    transform-origin: center center;
    animation: ${pulsatingIcon} 3s linear infinite;
  }
  &:after {
    animation-delay: 2s;
  }
`;

const MoreToComeStoryText = styled.span`
  color: tomato;
`;

const HikingIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TimelineEndInActiveTrip = () => (
  <TheEndContainer>
    <TripEndTimeLineLine/>
    <PulsatingIcon/>

    <TheEndIconTextcontainer>
      <HikingIcon src={hikingIcon}/>
      <MoreToComeStoryText>Check back here later today or tomorrow for more stories!</MoreToComeStoryText>
    </TheEndIconTextcontainer>
  </TheEndContainer>
);

export default TimelineEndInActiveTrip;