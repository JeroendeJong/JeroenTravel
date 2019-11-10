import React, { useEffect, useState } from 'react';
import { TravelDark, FlightTheme, TravelLight } from './themes';
import { ThemeProvider } from 'styled-components';
import { Route } from 'react-router';
import { TRAVEL_ROUTE, FLIGHT_ROUTE } from './routes';

import TravelApp from './UI/travel/App';
import FlightApp from './UI/flight/App';

const THEME_MODE_LIGHT = 'light';
const THEME_MODE_DARK = 'dark';

const getTheme = (isDark: boolean, type: string) => {
  if (type === 'travel') {
    return isDark ? TravelDark : TravelLight;
  }

  if (type === 'flights') {
    return FlightTheme;
  }
}

const AppContent = () => {
  const [theme, setTheme] = useState(THEME_MODE_LIGHT);
  useEffect(() => {
    if (!window.matchMedia) return;
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      setTheme(THEME_MODE_DARK)
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={getTheme(theme === THEME_MODE_DARK, 'travel')}>
        <Route path={TRAVEL_ROUTE} component={TravelApp}/>
      </ThemeProvider>

      <ThemeProvider theme={getTheme(theme === THEME_MODE_DARK, 'flights')}>
        <Route exact path={FLIGHT_ROUTE} component={FlightApp}/>
      </ThemeProvider>
    </>
  );
}

export default AppContent;