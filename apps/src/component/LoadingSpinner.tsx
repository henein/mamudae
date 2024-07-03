import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = ({ ...props }) => {
  return (
    <Spinner
      width={props.width}
      height={props.height}
      borderWidth={props.borderWidth}
    />
  );
};

export default LoadingSpinner;

const Spinner = styled.div<{
  width: number;
  height: number;
  borderWidth: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  box-sizing: border-box;
  border: ${({ borderWidth }) => `${borderWidth}px`} solid
    ${({ theme }) => theme.characterCardButton};
  border-right-color: rgba(0, 0, 0, 0);
  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
