import App from './UI/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'evil-icons/assets/evil-icons.css';
import map from './map';
const _ = require('evil-icons/assets/evil-icons');

const theme = {
  color: {
    highlight: '#ffa600',
    secondaryBase: '#003f5c',
    primaryBase: '#dd9000'
  }
};

map.create();
  
ReactDOM.render((
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>
), document.getElementById('root'));