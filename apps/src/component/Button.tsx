import React from "react";
import styled, { DefaultTheme } from "styled-components";

type BtnStyle = "primary" | "secondary" | "danger";
type BtnType = "reset" | "submit" | "button";

interface IButton {
  sort: BtnStyle;
  type?: BtnType;
  width?: string;
  fontWeight?: string;
  onClick?: any;
  disabled?: boolean;
}

const SORT: {
  [key: string]: {
    background: keyof DefaultTheme;
  };
} = {
  primary: {
    background: "brand",
  },
  secondary: {
    background: "button",
  },
  danger: {
    background: "danger",
  },
};

const getButtonStyle = (theme: DefaultTheme, sort: BtnStyle) => {
  return `
      background-color: ${theme[SORT[sort].background]};
    `;
};

const Button = ({
  sort,
  children,
  type,
  onClick,
  disabled,
  ...props
}: React.PropsWithChildren<IButton>) => {
  return (
    <StyledButton
      sort={sort}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<IButton>`
  ${({ theme, sort }) => getButtonStyle(theme, sort)}
  width: ${({ width }) => width};
  height: 40px;
  font-size: 14px;
  font-weight: ${({ fontWeight }) => fontWeight};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 12px 16px;
  color: ${({ theme, sort }) => (sort === "secondary" ? theme.text : "white")};
  transition: all ease-in-out 100ms;
  &:hover:enabled {
    background-color: ${({ theme, sort }) =>
      sort === "primary"
        ? theme.brandHover
        : sort === "danger" && theme.dangerHover};
    color: ${({ theme, sort }) => sort === "secondary" && theme.brandHover};
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.boxShadow};
  }
  &:active:enabled {
    background-color: ${({ theme, sort }) =>
      sort === "primary"
        ? theme.brandActive
        : sort === "danger" && theme.dangerActive};
    color: ${({ theme, sort }) => sort === "secondary" && theme.brandActive};
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.border};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.buttonDisableBackground};
    color: ${({ theme }) => theme.buttonDisableText};
    cursor: auto;
  }
`;
