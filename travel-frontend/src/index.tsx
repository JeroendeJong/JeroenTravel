import App from './UI/App';
import ReactDOM from 'react-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {darken} from 'polished'
import 'evil-icons/assets/evil-icons.css';
import map from './map';

// eslint-disable-next-line
const _ = require('evil-icons/assets/evil-icons');

const theme = {
  color: {
    white: '#E6E6E6',
    black: '#E6E6E6',
    highlight: darken(0.1, '#297373'),
    secondary: '#202030',
    primary: '#297373'
  }
};

map.create();
  
ReactDOM.render((
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>
), document.getElementById('root'));