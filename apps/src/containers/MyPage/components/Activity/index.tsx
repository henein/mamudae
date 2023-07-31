import React from "react";
import styled from "styled-components";
import ContentBox from "./ContentBox";
const Activity = () => {
  const data = {
    content: [],
    totalPages: 100,
  };
  const refetch = () => {
    console.log("myPage pageNation");
  };
  return (
    <Container>
      <MyBoard type="게시글" data={data} refetch={refetch} />
      <MyComment type="댓글 단 게시글" data={data} refetch={refetch} />
    </Container>
  );
};

export default Activity;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const MyBoard = styled(ContentBox)``;
const MyComment = styled(ContentBox)``;
