import { darken, lighten } from "polished";

export const FlightTheme = {
  color: {
    white: '#E6E6E6',
    black: '#E6E6E6',
    highlight: darken(0.1, '#297373'),
    secondary: '#202030',
    primary: '#297373'
  }
};

export const TravelLight = {
  color: {
    white: '#0D0A0B',
    black: '#0D0A0B',
    highlight: lighten(0.4, '#454955'),
    secondary: 'white',
    primary: '#0D0A0B'
  }
};

export const TravelDark = {
  color: {
    white: 'white',
    black: 'white',
    highlight: lighten(0.4, '#011219'),
    secondary: '#2c2927',
    primary: 'white'
  }
}