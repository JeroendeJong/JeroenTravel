import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {lighten, darken} from 'polished'
import 'evil-icons/assets/evil-icons.css';
import map from './map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TravelApp from './UI/travel/App';
import FlightApp from './UI/flight/App';
import AppContainer from './app-container';
import {FLIGHT_ROUTE, TRAVEL_ROUTE} from './routes';

// eslint-disable-next-line
const _ = require('evil-icons/assets/evil-icons');

const FlightTheme = {
  color: {
    white: '#E6E6E6',
    black: '#E6E6E6',
    highlight: darken(0.1, '#297373'),
    secondary: '#202030',
    primary: '#297373'
  }
};

const TravelTheme = {
  color: {
    white: '#0D0A0B',
    black: '#0D0A0B',
    highlight: lighten(0.4, '#454955'),
    secondary: 'white',
    primary: '#0D0A0B'
  }
};

map.create();
  
ReactDOM.render((
  <Router>
    <AppContainer>

      <ThemeProvider theme={TravelTheme}>
        <Route path={TRAVEL_ROUTE} component={TravelApp} />
      </ThemeProvider>

      <ThemeProvider theme={FlightTheme}>
        <Route exact path={FLIGHT_ROUTE} component={FlightApp} />
      </ThemeProvider>

    </AppContainer>
  </Router>
), document.getElementById('root'));