import React from 'react';
import styled from 'styled-components';
import airplaneIcon from '../../img/050-airplane.svg';
import { ContextOptionButtons } from './misc/common';

const ActiveTripNote = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ActiveTripImage = styled.img`
  width: 50px;
  height: 50px;
  margin: auto;
  margin-bottom: 20px;
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
      <ActiveTripImage src={airplaneIcon}/>
      I am currently doing this trip! please feel free to press the follow button so you can stay up-to-date with my latest stories and experiences. 
      <ActiveTripAskNotification onClick={onClick}>
        Follow
      </ActiveTripAskNotification>
    </ActiveTripNote>
  )
}

export default ActiveTripPromotion;
