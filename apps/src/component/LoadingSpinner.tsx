import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const LoadingSpinner = () => {
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  return <Spinner darkModeState={darkModeState} />;
};

export default LoadingSpinner;

const Spinner = styled.div<{ darkModeState: boolean }>`
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.characterCardButton};
  border-right-color: rgba(0, 0, 0, 0);
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
