import React from "react";
import styled from "styled-components";
import UserPostList from "./UserPostList";
import BoardHead from "./BoardHead";

export type BoardInfoType = {
  boardTitle: "전체" | "자유" | "유머" | "보스" | "정보";
  isLarge?: boolean;
};

function Board({ boardTitle, isLarge }: BoardInfoType) {
  return (
    <Layout>
      <BoardContent isLarge={isLarge}>
        <BoardHead boardTitle={boardTitle} />
        <UserPostList boardTitle={boardTitle} />
      </BoardContent>
    </Layout>
  );
}
export default Board;

const Layout = styled.div`
  box-sizing: border-box;
`;
const BoardContent = styled.div<{ isLarge?: boolean }>`
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  width: ${(props) => (props.isLarge ? "816px" : "396px")};
  height: 332px;
  box-sizing: border-box;
  z-index: 0.5;
`;
