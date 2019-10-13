import React from 'react';
import styled, { css } from 'styled-components';
import { MOBILE_BREAKPOINT, MobileOnly } from '../../mobile';
import { rgba } from 'polished';
import DrawerStore from './drawer-store';
import { thisExpression } from '@babel/types';

const FloatingBottomDrawer = css`
  position: fixed;
  left: 10px;
  right: 10px;
  bottom: 10px;

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    top: 10px;
    width: 380px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transition: height 0.2s;
    ${(p: any): any => `height: calc(33% + ${p['data-expanded']}%);`}
    max-height: 66%;
    min-height: 33%;
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

const UserHintPill = styled.div`
  width: 20%;
  height: 4px;
  background-color: lightgray;
  margin: auto;
  border-radius: 100px;
  margin-top: 4px;
`;

interface State {
  expanded: number;
}

class DrawerInstance extends React.Component<any, State>  {

  public state: State = {
    expanded: 33
  }
  
  constructor(props: any) {
    super(props);
  }

  private handleDrawerActive = (active: boolean) => {
    if (active) this.setState({expanded: 33});
    else this.setState({expanded: 0});
  }

  private handleClick = () => {
    this.setState({expanded: 33});
  }

  public componentDidMount() {
    DrawerStore.on('DRAWER_ACTIVE', this.handleDrawerActive);
  }

  public render() {
    return (
      <Drawer data-expanded={this.state.expanded} onClick={this.handleClick}>
        <MobileOnly>
          <UserHintPill/>
        </MobileOnly>
        {this.props.children}
      </Drawer>
    );
  }
}

export default DrawerInstance;
