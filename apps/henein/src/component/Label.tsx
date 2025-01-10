import React from "react";
import styled from "styled-components";

interface ILabel {
  type: "WRITER" | "USER";
}

const labelContent = (type: string) => {
  switch (type) {
    case "WRITER":
      return "작성자";
    case "USER":
      return "유저";
    default:
      return null;
  }
};

const Label = (props: React.PropsWithChildren<ILabel>) => {
  return (
    <Container {...props}>
      {props.children || labelContent(props.type)}
    </Container>
  );
};

export default Label;

const Container = styled.div<ILabel>`
  display: ${({ type }) => type !== "WRITER" && "none"};
  padding: 2px 4px;
  color: "#FFF";
  font-size: 12px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "WRITER":
        return theme.brand;
      case "USER":
        return theme.text;
      default:
        return "#000";
    }
  }};
  border-radius: 8px;
`;
