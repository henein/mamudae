import React from "react";
import styled from "styled-components";
import useScroll from "../../../hooks/scrollHooks/useScroll";
import CommentForm from "./CommentForm";

interface postinfos {
  boardId: string;
  totalComment: string;
}
const Write = ({ ...data }: postinfos) => {
  const { isScrollDown } = useScroll();
  return (
    <Container isScrollDown={isScrollDown}>
      <NumberOfComments>댓글 {data.totalComment}개</NumberOfComments>
      <CommentForm
        setIsClick={() => {}}
        boardId={data.boardId}
        isRecomment={false}
      />
    </Container>
  );
};

export default Write;
const NumberOfComments = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
  margin-top: 20px;
  color: ${(prop) => prop.theme.text};
`;
const Container = styled.div<{ isScrollDown: boolean }>`
  position: sticky;
  z-index: 2;
  top: ${({ isScrollDown }) => (isScrollDown ? "16px" : "88px")};
  transition: top 0.2s ease-in-out;
  box-shadow: ${({ theme }) => `0px 4px 8px ${theme.boxShadow}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  min-height: 97px;
  height: auto;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 24px;
  background-color: ${(prop) => prop.theme.cardHeader};
`;
