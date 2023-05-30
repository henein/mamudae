import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { ThemeProvider } from 'styled-components';
import { lightMode, darkMode } from '../constants/DefaultTheme';
import GlobalStyles from '../../styles/GlobalStyles';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';
import { ScrollProvider } from './ScrollProvider';

const Layout = ({ children }: React.PropsWithChildren) => {
  const isDarkMode = useDarkMode();
  
  const theme = isDarkMode ? darkMode : lightMode;
  return (
    <ThemeProvider theme={theme}>
      <ScrollProvider>
        <GlobalStyles />
        <Header />
        {children}
        <Footer />
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default Layout;
