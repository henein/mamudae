import React from "react";
import styled from "styled-components";
import { customColor } from "../constants/customColor";

const Board = () => {
  return (
    <Container>
      <Header>게시판</Header>
      <List>
        <Li>자유</Li>
        <Li>유머</Li>
        <Li>보스</Li>
        <Li>직업</Li>
      </List>
    </Container>
  );
};

export default Board;
const Header = styled.div`
  font-size: 16px;
  font-weight: 900;
  padding: 20px 24px 8px 24px;
  border-radius: 32px 32px 0 0;
  background-color: ${customColor.boardHeaderGray};
`;
const List = styled.ul``;
const Li = styled.li`
  padding: 8px 24px;
  font-size: 12px;
`;
const Container = styled.div`
  width: 300px;
  background-color: ${customColor.white};
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  padding-bottom: 12px;
`;
