import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styled, { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "../constants/DefaultTheme";
import GlobalStyles from "../../styles/GlobalStyles";
import { ScrollProvider } from "./ScrollProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const Layout = ({ children }: React.PropsWithChildren) => {
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  return (
    <ThemeProvider theme={darkModeState ? darkMode : lightMode}>
      <ScrollProvider>
        <GlobalStyles />
        <PageDiv>
          <Header />
          {children}
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
  justify-content: space-between;
  min-height: 100vh;
`;
