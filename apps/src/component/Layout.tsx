import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styled, { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "../constants/DefaultTheme";
import GlobalStyles from "../../styles/GlobalStyles";
import { ScrollProvider } from "./ScrollProvider";

const Layout = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme === "light" ? lightMode : darkMode}>
      <ScrollProvider>
        <GlobalStyles />
        <PageDiv>
          <div>
            <Header setTheme={setTheme} />
            {children}
          </div>
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
