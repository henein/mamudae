import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";

type SortBtnType = "sub" | "main";
type BtnType = "reset" | "submit" | "button";

interface IButton {
  sort: SortBtnType;
  width: string;
  height: string;
  fontWeight?: string;
  size?: number;
  type?: BtnType;
}

const SORT = {
  main: {
    background: customColor.orange,
    color: customColor.white,
    hoverBackground: customColor.darkOrange,
  },
  sub: {
    background: customColor.white,
    color: customColor.black,
    hoverBackground: "#ccc",
  },
};

const getButtonStyle = (sort: SortBtnType) => {
  return `
      background-color: ${SORT[sort].background};
      color: ${SORT[sort].color};
      &:hover {
        background-color: ${SORT[sort].hoverBackground};
      }
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
  ${({ sort }) => getButtonStyle(sort)}
  font-size: ${({ size }) => (size ? size + "px" : "14px")};
  font-weight: ${({ fontWeight }) => fontWeight};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 16px;
  &:active {
    transform: scale(0.98);
  }
`;
