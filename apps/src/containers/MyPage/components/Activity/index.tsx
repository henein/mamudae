import React from "react";
import styled from "styled-components";
import ContentBox from "./ContentBox";
import {
  useGetMyBoard,
  useGetMyCommentBoard,
} from "../../../../hooks/myPageHooks/useUserActivity";

const Activity = () => {
  const myBoards = useGetMyBoard({
    options: {
      refetchOnWindowFocus: false,
    },
  });
  const myCommentBoards = useGetMyCommentBoard({
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const myBoardsData = {
    content: myBoards.data || [],
    totalPages: Math.floor(myBoards.data?.length / 10) + 1 || 0,
  };
  const myCommentBoardsData = {
    content: myCommentBoards.data || [],
    totalPages: Math.floor(myCommentBoards.data?.length / 10) + 1 || 0,
  };

  return (
    <Container>
      <MyBoard type="게시글" data={myBoardsData} />
      <MyComment type="댓글 단 게시글" data={myCommentBoardsData} />
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
