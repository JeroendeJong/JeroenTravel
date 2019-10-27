import styled from "styled-components";
import React from 'react';

export const MOBILE_BREAKPOINT = 700;
const MobileOnlyDiv = styled.div`
  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    display: none;
  }
`;

export const isMobile = () => {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export const MobileOnly = (props: any) => {
  return (
    <MobileOnlyDiv {...props}>
      {props.children}
    </MobileOnlyDiv>
  );
}
