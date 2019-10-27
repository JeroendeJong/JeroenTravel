import styled from "styled-components";
import React from "react";

const ScrollableView = styled.div`
  overflow-y: scroll;
  height: 100%;

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