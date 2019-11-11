import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;

  font-size: 12px;
  font-weight: lighter;
  color: black;

  width: 99%;
  margin-top: 35px;

  box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.2);
  /* width: 80%; */
  margin-left: 20px;
  margin-bottom: 20px;
}
`;

const TimelineBody = (props: any) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

export default TimelineBody;