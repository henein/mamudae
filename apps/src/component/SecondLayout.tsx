import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightMode, darkMode } from '../constants/DefaultTheme';
import GlobalStyles from '../../styles/GlobalStyles';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';

const SecondLayout = ({ children }: React.PropsWithChildren) => {
  const { darkModeState } = useDarkMode();

  const theme = darkModeState ? darkMode : lightMode;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div id="captcha-portal" />
        {children}
      </ThemeProvider>
    </>
  );
};

export default SecondLayout;
