import { darken, lighten } from "polished";

export const FlightTheme = {
  color: {
    text: 'green',
    highlight: darken(0.1, '#297373'),
    secondary: '#202030',
    primary: '#297373'
  }
};

export const TravelLight = {
  color: {
    text: '#3C3C3C',
    highlight: lighten(0.4, '#454955'),
    secondary: 'white',
    primary: '#465775'
  }
};

export const TravelDark = {
  color: {
    text: 'white',
    highlight: lighten(0.4, '#011219'),
    secondary: '#2c2927',
    primary: '#012622'
  }
}