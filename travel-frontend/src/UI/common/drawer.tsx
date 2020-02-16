import React from 'react';
import styled, { css } from 'styled-components';
import { MOBILE_BREAKPOINT, MobileOnly } from '../../mobile';
import DrawerStore from './drawer-store';
import Icon from './evil-icon';
import { withRouter } from 'react-router';

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
  border-bottom: 1px solid lightgray;
`;

const LeftButtonGroup = styled.div`
  float: left;
  display: flex;
  justify-content: space-evenly;
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
    return (
      <>
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
        </DrawerContentTop>
        {this.props.children}
      </>
    );
  }
}

export default withRouter(DrawerInstance);
