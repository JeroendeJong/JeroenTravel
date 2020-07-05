import styled from "styled-components";
import React from "react";
import { MOBILE_BREAKPOINT } from "../../mobile";

const ScrollableView = styled.div`
  overflow-y: scroll;
  
  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    height: calc(100% - 61px);
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height:  ${() => window.innerHeight - 150}px;
    /* height: calc(100vh - 150px); */
    /* height: -webkit-fill-available; */
  }

  ${p => {
    if ((p as any)['data-scroll-shadow']) {
      return `
        box-shadow: inset 0px 4px 21px -9px rgba(0,0,0,1);
      `;
    }
  }}
`;

class Scroll extends React.Component<any> {
  private ref: React.Ref<HTMLDivElement> = React.createRef();

  public render() {
    return(
      <ScrollableView {...this.props} ref={this.ref} data-scroll-enabled={true}>
        {this.props.children}
      </ScrollableView>
    )
  }

}


export default Scroll;