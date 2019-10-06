import styled, { css } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../mobile';
import { rgba } from 'polished';

const FloatingBottomDrawer = css`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    top: 10px;
    width: 380px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 33%;
  }
`;

const Drawer = styled.div`
  ${FloatingBottomDrawer}

  z-index: 2;
  background-color: ${p => p.theme.color.secondary};
  color: ${p => p.theme.color.white};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);
  border-radius: 6px;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(8px);
    background-color: ${p => rgba(p.theme.color.secondary,0.9)};
  }
`;

export default Drawer;