import React from "react";
import { ThemeProvider } from "styled-components";
import { lightMode, darkMode } from "../constants/DefaultTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GlobalStyles from "../../styles/GlobalStyles";

const SecondLayout = ({ children }: React.PropsWithChildren) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  const theme = isDarkMode ? darkMode : lightMode;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};

export default SecondLayout;
