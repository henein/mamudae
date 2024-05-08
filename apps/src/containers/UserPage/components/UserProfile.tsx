import React from 'react';
import styled from 'styled-components';

const UserProfile = () => {
  return (
    <Conatiner>
      <ImageDiv />
      <UserInfo>
        <CreatedDate>가입일 2023.03.27</CreatedDate>
        <Nickname>프돔이입니다</Nickname>
      </UserInfo>
    </Conatiner>
  );
};

export default UserProfile;

const Conatiner = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px 24px;
  height: 148px;
`;
const ImageDiv = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  background-color: aqua;
  border: 1px solid ${({ theme }) => theme.border};
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const CreatedDate = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.subText};
`;
const Nickname = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.text};
`;
