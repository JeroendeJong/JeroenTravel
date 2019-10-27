import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;

  font-size: 12px;
  font-weight: lighter;
  color: black;
`;

const TimelineBody = (props: any) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default TimelineBody;