import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
  margin-top: 10px;

  cursor: pointer;
`;

const HeaderPoint = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${p => p.theme.color.primary};
  transform: rotate(45deg);
`;

const HeaderTitle = styled.span`
  padding-left: 10px;
  text-transform: capitalize;
  color: ${p => p.theme.color.primary};
`;

const TimelineHeader = (props: any) => {
  return (
    <Container data-id={props.id}  onClick={props.onClick}>
      <HeaderPoint/>
      <HeaderTitle>
        {props.title}
      </HeaderTitle>
    </Container>
  );
}

export default TimelineHeader;