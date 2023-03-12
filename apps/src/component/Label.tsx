import React from "react";
import styled from "styled-components";
import { customColor, customColorType } from "../constants/customColor";

interface ILabel {
  type: keyof customColorType; // floor | level | job 등등
  // 단계별, 레벨별 색깔 데이터를 받기?
}

const handleColor = (type: keyof customColorType) => {
  for (const keyStore of Object.keys(customColor)) {
    if (keyStore === type) return customColor[keyStore];
  }
};
const Label = (props: React.PropsWithChildren<ILabel>) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Label;

const Container = styled.div<ILabel>`
  padding: 2px 4px;
  color: ${customColor.white};
  font-size: 12px;
  background-color: ${({ type }) => handleColor(type)};
  border-radius: 8px;
  margin-right: 4px;
`;
