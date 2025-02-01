import React from 'react';
import Footer from './Footer';
import styled, { ThemeProvider } from 'styled-components';
import { lightMode, darkMode } from '../constants/DefaultTheme';
import GlobalStyles from '../../styles/GlobalStyles';
import { ScrollProvider } from './ScrollProvider';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';
import { MamudaeHeader } from '@henein/components';
const Layout = ({ children }: React.PropsWithChildren) => {
  const { darkModeState } = useDarkMode();

  return (
    <ThemeProvider theme={darkModeState ? darkMode : lightMode}>
      <ScrollProvider>
        <GlobalStyles />
        <div id="modal-root" />
        <div className='flex flex-col min-h-screen'>
          <MamudaeHeader />
          {/*<Announcement />*/}
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </div>
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default Layout;

const PageWrapper = styled.div`
  flex: 1;
  display: flex;
`;
