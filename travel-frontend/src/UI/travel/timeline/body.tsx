import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Icon from '../../common/evil-icon';
import { StyledHover } from '../../styled-utils';

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;

  margin-left: 20px;

  font-size: 12px;
  font-weight: lighter;

  width: 99%;
  border-radius: 8px;

  color: ${p => darken(0.5, p.theme.color.text)};
  background-color: ${p => darken(0.1, p.theme.color.secondary)};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

  :first-child {
    margin-top: 50px;
  }

  :not(:first-child) {
    margin-top: 10px;
  }

  :last-child {
    margin-bottom: 10px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${StyledHover`
    cursor: pointer;
  `}
}
`;

const MainContent = styled.div``;

const TimelineBody = (props: any) => {
  return (
    <Container>
      <MainContent>
        {props.children}  
      </MainContent>
      <Icon id={'ei-chevron-right-icon'}/>
    </Container>
  );
}

export default TimelineBody;