import React from "react";
import styled from "styled-components";
import UserHistoryBox from "./UserHistoryBox";
import { Title } from "../Character/CharSelectBox";
import UserInfoBox from "./UserInfoBox";
import { useGetMyProfile } from "../../../../hooks/myPageHooks/useUserProfile";

const Profile = () => {
  const myProfile = useGetMyProfile({}).data;

  console.log(myProfile);
  return (
    <Container>
      <Title>프로필</Title>
      {myProfile && (
        <Content>
          <UserInfoBox
            imageUrl={myProfile.imageUrl}
            userEmail={myProfile.userEmail}
            userName={myProfile.userName}
          />
          <HistoryList>
            <UserCreateDate
              title="가입한 날짜"
              history={myProfile.signUpDate
                .map((num: number) => num.toString().padStart(2, "0"))
                .join(".")}
            />
            <UserPostNum
              title="작성한 게시글 수"
              history={myProfile.boardCount}
            />
            <UserCommentNum
              title="작성한 댓글 수"
              history={myProfile.commentCount}
            />
          </HistoryList>
        </Content>
      )}
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  gap: 32px;
`;
const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const UserCreateDate = styled(UserHistoryBox)``;
const UserPostNum = styled(UserHistoryBox)``;
const UserCommentNum = styled(UserHistoryBox)``;
