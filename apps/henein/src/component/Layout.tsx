import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../../styles/GlobalStyles";
import { darkMode, lightMode } from "../constants/DefaultTheme";
import useDarkMode from "../hooks/reduxHooks/useDarkMode";
import Announcement from "./AnnounceComponent/Announcement";
import Footer from "./Footer";
import Header from "./Header";
import { ScrollProvider } from "./ScrollProvider";

const Layout = ({ children }: React.PropsWithChildren) => {
  const { darkModeState } = useDarkMode();

  return (
    <ThemeProvider theme={darkModeState ? darkMode : lightMode}>
      <ScrollProvider>
        <GlobalStyles />
        <div id="modal-root" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <Announcement />
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
