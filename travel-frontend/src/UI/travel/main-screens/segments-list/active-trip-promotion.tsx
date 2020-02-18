import React from 'react';
import styled from 'styled-components';
import { ContextOptionButtons } from '../../misc/common';
import WorldAirplaneIcon from '../../icons/world-airplane';

const ActiveTripNote = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;

  color: ${p => p.theme.color.text};
`;

const ActiveTripAskNotification = styled(ContextOptionButtons)`
  font-size: 16px;
  margin: auto;
  padding: 5px;
  margin-top: 10px;
`;

const onClick = () => {
  (window as any).Notification.requestPermission();
}

const ActiveTripPromotion = () => {
  return (
    <ActiveTripNote>
      <WorldAirplaneIcon/>
      I am currently doing this trip! please feel free to press the follow button so you can stay up-to-date with my latest stories and experiences. 
      <ActiveTripAskNotification onClick={onClick}>
        Follow
      </ActiveTripAskNotification>
    </ActiveTripNote>
  )
}

export default ActiveTripPromotion;
