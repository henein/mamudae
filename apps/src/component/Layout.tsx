import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styled, { ThemeProvider } from 'styled-components';
import { lightMode, darkMode } from '../constants/DefaultTheme';
import GlobalStyles from '../../styles/GlobalStyles';
import { ScrollProvider } from './ScrollProvider';
import Announcement from './AnnounceComponent/Announcement';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';
const Layout = ({ children }: React.PropsWithChildren) => {
  const { darkModeState } = useDarkMode();

  return (
    <ThemeProvider theme={darkModeState ? darkMode : lightMode}>
      <ScrollProvider>
        <GlobalStyles />
        <div id="modal-root" />
        <PageDiv>
          <Header />
          <Announcement />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </PageDiv>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default Layout;

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const PageWrapper = styled.div`
  flex: 1;
  display: flex;
`;
