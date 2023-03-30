import React from "react";
import styled from "styled-components";
import UserPostList from "./UserPostList";
import BoardHead from "./BoardHead";
import { BoardInfoType } from "../MainPage";
import { customColor } from "../../../constants/customColor";

function Board({ board_title, isLarge }: BoardInfoType) {
  return (
    <Layout>
      <BoardContent isLarge={isLarge}>
        <BoardHead board_title={board_title} />
        <UserPostList board_title={board_title} />
      </BoardContent>
    </Layout>
  );
}
export default Board;

const Layout = styled.div`
  box-sizing: border-box;
`;
const BoardContent = styled.div<{ isLarge?: boolean }>`
  border: 1px solid ${customColor.whiteGray};
  background-color: ${customColor.white};
  border-radius: 16px;
  width: ${(props) => (props.isLarge ? "816px" : "396px")};
  height: 332px;
  box-sizing: border-box;
  z-index: 0.5;
`;
