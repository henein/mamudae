import React from "react";
import styled from "styled-components";
import ContentBox from "./ContentBox";
const index = () => {
  return (
    <Container>
      <MyBoard type="게시글" />
      <MyComment type="댓글 단 게시글" />
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const MyBoard = styled(ContentBox)``;
const MyComment = styled(ContentBox)``;
