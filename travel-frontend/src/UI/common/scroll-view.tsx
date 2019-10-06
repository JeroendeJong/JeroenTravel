import styled from "styled-components";

const ScrollableView = styled.div`
  overflow-y: scroll;
  height: 100%;
  border-radius: 6px;

  ${p => {
    if ((p as any)['data-scroll-shadow']) {
      return `
        box-shadow: inset 0px 4px 21px -9px rgba(0,0,0,1);
      `;
    }
  }}
`;

export default ScrollableView;