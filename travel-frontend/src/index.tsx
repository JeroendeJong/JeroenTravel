import ReactDOM from 'react-dom';
import React from 'react';
import map from './map';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './app-container';
import AppContent from './app-content';

import 'evil-icons/assets/evil-icons.css';
// eslint-disable-next-line
const _ = require('evil-icons/assets/evil-icons');

map.create();
  
ReactDOM.render((
  <Router>
    <AppContainer>
      <AppContent/>
    </AppContainer>
  </Router>
), document.getElementById('root'));