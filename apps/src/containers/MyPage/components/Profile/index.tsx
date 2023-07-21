import React from "react";
import styled from "styled-components";
import UserHistoryBox from "./UserHistoryBox";
const index = () => {
  return (
    <Container>
      <div>profile</div>
      <HistoryList>
        <UserCreateDate title="가입한 날짜" history="2023.03.07" />
        <UserPostNum title="작성한 게시글 수" history="5" />
        <UserCommentNum title="작성한 댓글 수" history="10" />
      </HistoryList>
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const UserCreateDate = styled(UserHistoryBox)``;
const UserPostNum = styled(UserHistoryBox)``;
const UserCommentNum = styled(UserHistoryBox)``;
