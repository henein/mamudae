import React from "react";
import styled from "styled-components";
import CharSelectBox from "./CharSelectBox";
import Button from "../../../../component/Button";
import Image from "next/image";
const MyChar = () => {
  return (
    <Container>
      <CharSelectBox type="인증" />
      <CharSelectBox type="미인증" />

      <UserAuthLine>
        <QuestionBtn>
          <Image
            src="/myPageImages/question.svg"
            width="20"
            height="21"
            alt=""
          />
        </QuestionBtn>
        <BottomForm>
          <InputBox placeholder="토큰"></InputBox>
          <AuthBtn sort="primary" type="submit" width="81px" fontWeight="500">
            인증하기
          </AuthBtn>
        </BottomForm>
      </UserAuthLine>
    </Container>
  );
};

export default MyChar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
const UserAuthLine = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;
const InputBox = styled.input`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.input};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  ::placeholder {
    color: ${({ theme }) => theme.subText};
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }
`;
const QuestionBtn = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;
const AuthBtn = styled(Button)``;
const BottomForm = styled.form`
  display: flex;
  gap: 8px;
`;
