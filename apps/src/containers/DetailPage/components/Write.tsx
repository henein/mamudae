import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";

interface postinfos {
  boardId: string;
  userData: any;
  totalComment: string;
}
const Write = ({ ...data }: postinfos) => {
  return (
    <Container>
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
const Container = styled.div`
  position: sticky;
  top: 0;
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
