import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {darken} from 'polished'
import 'evil-icons/assets/evil-icons.css';
import map from './map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TravelApp from './UI/travel/App';
import FlightApp from './UI/flight/App';

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
    white: '#E6E6E6',
    black: 'black',
    highlight: darken(0.1, '#297373'),
    secondary: '#202030',
    primary: '#297373'
  }
};

map.create();
  
ReactDOM.render((
  <Router>
    <ThemeProvider theme={FlightTheme}>
      <Route exact path="/" component={FlightApp} />
    </ThemeProvider>

    <ThemeProvider theme={FlightTheme}>
      <Route path="/travel" component={TravelApp} />
    </ThemeProvider>
  </Router>
), document.getElementById('root'));