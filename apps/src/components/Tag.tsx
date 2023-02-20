import React from "react";
import styled from "styled-components";
import { customColor, customColorType } from "../constants/customColor";

interface ITag {
  type: keyof customColorType; // floor | level | job 등등
}

const handleColor = (type: keyof customColorType) => {
  for (const keyStore of Object.keys(customColor)) {
    if (keyStore === type) return customColor[keyStore];
  }
};
const Tag = (props: React.PropsWithChildren<ITag>) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Tag;

const Container = styled.div<ITag>`
  padding: 2px 4px;
  color: ${customColor.white};
  font-size: 10px;
  background-color: ${({ type }) => handleColor(type)};
  border-radius: 8px;
  margin-right: 4px;
`;
