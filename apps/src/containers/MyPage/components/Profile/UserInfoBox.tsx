import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../component/Button";

const UserInfoBox = () => {
  const [isFault, setIsFault] = useState<boolean>(false);
  return (
    <Outer>
      <Container>
        <ProfileImg></ProfileImg>
        <InputDiv>
          <WarnText>잘못된 이메일입니다.</WarnText>
          <Nickname placeholder="닉네임" />
        </InputDiv>
      </Container>
      <Button sort="primary" type="submit" width="fit-content" fontWeight="400">
        저장하기
      </Button>
    </Outer>
  );
};

export default UserInfoBox;
const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Container = styled.div`
  display: flex;
  width: 528px;
  height: fit-content;
  padding: 20px 24px;
  gap: 16px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;
const ProfileImg = styled.div`
  width: 128px;
  height: 128px;
  background-color: #d9d9d9;
  border-radius: 100%;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const WarnText = styled.span`
  color: ${({ theme }) => theme.danger};
  font-size: 10px;
  font-weight: 400;
`;
const Nickname = styled.input`
  width: 200px;
  height: 41px;
  padding: 16px 12px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.input};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.subText};
    font-size: 14px;
    font-weight: 400;
  }
`;
