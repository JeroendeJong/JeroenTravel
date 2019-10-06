import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-left: 1px solid ${p => p.theme.color.primary};

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-left: 3px;

  font-size: 12px;
  font-weight: lighter;
  color: lightgray;
`;

const TimelineBody = (props: any) => {
  return (
    <Container>
      {props.body}
    </Container>
  );
}

export default TimelineBody;