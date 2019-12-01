import React from 'react';
import styled, { css } from 'styled-components';
import { MOBILE_BREAKPOINT, MobileOnly } from '../../mobile';
import { rgba } from 'polished';
import DrawerStore from './drawer-store';
import Icon from './evil-icon';
import { withRouter } from 'react-router';

const FloatingBottomDrawer = css`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    min-width: 400px;
    max-width: 700px;
    width: 50%;
    top: 0px;
    border-radius: 0px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transition: height 0.2s;
    ${(p: any): any => { 
      const isActive = p['data-active'];
      if (isActive) return  `height: 66%;`
      else return 'height: 33%;'
    }}
    max-height: 66%;
    min-height: 33%;
  }
`;

const Drawer = styled.div`
  ${FloatingBottomDrawer}

  z-index: 2;
  background-color: ${p => p.theme.color.secondary};
  color: ${p => p.theme.color.text};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(8px);
    background-color: ${p => rgba(p.theme.color.secondary,0.9)};
  }
`;

const DrawerResizeIconMobile = styled(MobileOnly)`
  svg {
    width: 40px;
    height: 30px;
  }
`;

const CloseBackIcon = styled(Icon)`
  float: left;
  width: 40px !important;
  height: 30px !important;
`;

const DrawerContentTop = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  box-shadow: 0px 4px 15px -10px rgba(0,0,0,1);
`;

const LeftButtonGroup = styled.div`
  float: left;
  display: flex;
  justify-content: space-evenly;
`;

const RightButtonGroup = styled.div`
  float: right;
  display: flex;
`;

const FillerTopContent = styled.div`width: 100%;`;

interface State {
  active: boolean;
  closeable: boolean;
  backable: boolean;
  topContent: null | JSX.Element;
}

// interface Props {
//   onCloseContentId?: any;
//   onBackContentId?: any;
//   children: any;
// }

class DrawerInstance extends React.Component<any, State>  {

  public state: State = {
    active: true,
    closeable: false,
    backable: false,
    topContent: null
  }

  private lastBackCallId: string[] = [];
  private lastCloseCallID: string[] = [];
  
  private handleTopContentRequest = (el: JSX.Element) => {
    this.setState({topContent: el});
  }

  private handleDrawerActiveToggle = (e: React.MouseEvent<any>) => {
    this.setState(oldState => ({active: !oldState.active}), () => {
      DrawerStore.notifyActive(this.state.active);
    });
  }

  private handleDrawerActive = (active: boolean) => this.setState({active});
  private handleDrawerCloseable = (callId: string) => {
    this.lastCloseCallID.push(callId);
    if (this.lastCloseCallID.length > 0) {
      this.setState({closeable: true});
    }
  }
  private handleDrawerBackable = (callId: string) => {
    this.lastBackCallId.push(callId);
    if (this.lastBackCallId.length > 0) {
      this.setState({backable: true});
    }
  }

  private handleClose = () => {
    const {history} = this.props;
    history.push('/')
    this.setState({closeable: false});
  }

  private handleBack = () => {
    const {location, history} = this.props;
    const path = location.pathname.split('/');
    if (path[3] === 'segment') {
      history.push(`/${path[1]}/${path[2]}`);
    } else if (path[1] === 'trip') {
      history.push(`/`);
    } else return;

    this.setState({backable: false});
  }

  public componentDidMount() {
    DrawerStore.on('DRAWER_ACTIVE', this.handleDrawerActive);
    DrawerStore.on('CONTENT_CLOSEABLE', this.handleDrawerCloseable);
    DrawerStore.on('CONTENT_BACKABLE', this.handleDrawerBackable);
    DrawerStore.on('DRAWER_TOP_CONTENT', this.handleTopContentRequest);
  }

  public render() {
    const drawerActiveIconID = this.state.active
      ? "ei-arrow-down-icon"
      : "ei-arrow-up-icon";

    return (
      <Drawer data-active={this.state.active}>
        <DrawerContentTop id="handle">
          <LeftButtonGroup>
            {this.state.closeable && 
              <CloseBackIcon id="ei-close-o-icon" onClick={this.handleClose}/>
            }
            {this.state.backable && 
              <CloseBackIcon id="ei-arrow-left-icon" onClick={this.handleBack}/>
            }
          </LeftButtonGroup>

          {
            this.state.topContent || <FillerTopContent/>
          }
          <RightButtonGroup>
            <DrawerResizeIconMobile>
              <Icon id={drawerActiveIconID} onClick={this.handleDrawerActiveToggle}/>
            </DrawerResizeIconMobile>
          </RightButtonGroup>
        </DrawerContentTop>
        {this.props.children}
      </Drawer>
    );
  }
}

export default withRouter(DrawerInstance);
