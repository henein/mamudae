import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "../constants/DefaultTheme";
import GlobalStyles from "../../styles/GlobalStyles";
import useDarkMode from "../hooks/reduxHooks/useDarkMode";
import useScroll from "../hooks/scrollHooks/useScroll";

const Layout = ({ children }: React.PropsWithChildren) => {
  const isDarkMode = useDarkMode();
  const { isScrollDown, stickyTop } = useScroll();

  const [theme, setTheme] = useState("light");
  const themes = isDarkMode ? darkMode : lightMode;
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightMode : darkMode}>
        <GlobalStyles />
        <Head isScrollDown={isScrollDown} stickyTop={stickyTop}>
          <Header stickyTop={stickyTop} setTheme={setTheme} />
        </Head>
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Head = styled.header<{ isScrollDown: boolean; stickyTop: boolean }>`
  position: ${({ stickyTop }) => stickyTop && "sticky"};
  top: 0;
  z-index: 1000;
  transform: ${({ isScrollDown }) =>
    isScrollDown ? "translateY(-73px)" : "none"};
  transition: transform 0.2s ease-in-out;
`;
