import React from "react";
import styled from "styled-components";

const LoadingSpinner = () => {
  return <Spinner />;
};

export default LoadingSpinner;

const Spinner = styled.div`
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-right-color: rgba(0, 0, 0, 0);
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
