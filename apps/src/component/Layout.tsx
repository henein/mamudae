import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "../constants/DefaultTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GlobalStyles from "../../styles/GlobalStyles";

const Layout = ({ children }: React.PropsWithChildren) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  const [stickyTop, setStickyTop] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    console.log(window.scrollY);
    window.scrollY > 16 ? setStickyTop(true) : setStickyTop(false);
  };

  const theme = isDarkMode ? darkMode : lightMode;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Head stickyTop={stickyTop}>
          <Header stickyTop={stickyTop} />
        </Head>
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Head = styled.header<{ stickyTop: boolean }>`
  position: ${({ stickyTop }) => stickyTop && "sticky"};
  top: 0;
  z-index: 1000;
`;
