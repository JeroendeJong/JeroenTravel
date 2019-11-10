import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";
import {FLIGHT_ROUTE, TRAVEL_ROUTE} from './routes';
import styled, { createGlobalStyle } from "styled-components";
import { appIsInStandaloneMode } from "./UI/utils";

const StyledToastContainer = styled(ToastContainer)`
  font-family: 'Karla', sans-serif !important;

  @media only screen and (max-width: 480px) {
    width: 320px !important;
    padding: 4px !important;
    left: unset !important;
    top: 1em !important;
  }
  
  .Toastify__toast--info {
    background-color: #e55e5e;
    border-radius: 50px;
    min-height: 40px;
    height: 40px;
    padding-top: 4px;
    text-align: center;
  }

  .Toastify__toast-body {
    font-family: 'Karla', sans-serif !important;
  }
`;

const GlobalStandaloneStyle = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-touch-callout: none;
  }
`;

class AppContainer extends React.Component<any, any> {

  public componentDidMount() {
    const {location} = this.props.history;
    const currentPath = location.pathname;
    if (currentPath === FLIGHT_ROUTE) {
      setTimeout(() => {
        toast.info('Interested in my travel? Click here 🧳', {
          onClick: this.handleToastClick,
          autoClose: 8 * 1000,
          closeButton: false
        });
      }, 10 * 1000)
    }
  }

  private handleToastClick = () => {
    this.props.history.push(TRAVEL_ROUTE);
  }

  public render(): JSX.Element {
    return (
      <div>
        {appIsInStandaloneMode() &&
          <GlobalStandaloneStyle/>
        }
        <StyledToastContainer/>
        {this.props.children}
      </div>
    )
  }

  
}

export default withRouter(AppContainer);
