import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { customColor } from '../constants/customColor';

type SortBtnType = 'sub' | 'main';
type BtnType = 'reset' | 'submit' | 'button';

interface IButton {
  sort: SortBtnType;
  width: string;
  height: string;
  fontWeight?: string;
  size?: number;
  type?: BtnType;
}

const SORT: {
  [key: string]: { background: keyof DefaultTheme; color: keyof DefaultTheme };
} = {
  main: {
    background: 'Brand',
    color: 'Text',
  },
  sub: {
    background: 'button',
    color: 'Text',
  },
};

const getButtonStyle = (theme: DefaultTheme, sort: SortBtnType) => {
  return `
      background-color: ${theme[SORT[sort].background]};
      color: ${theme[SORT[sort].color]};
    `;
};

const Button = ({
  children,
  type,
  ...props
}: React.PropsWithChildren<IButton>) => {
  return (
    <StyledButton type={type} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<IButton>`
  ${({ theme, sort }) => getButtonStyle(theme, sort)}
  font-size: ${({ size }) => (size ? size + 'px' : '14px')};
  font-weight: ${({ fontWeight }) => fontWeight};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  &:active {
    transform: scale(0.98);
  }
`;
