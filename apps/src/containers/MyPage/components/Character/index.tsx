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
        <form>
          <InputBox placeholder="토큰"></InputBox>
          <AuthBtn sort="primary" type="submit" width="81px" fontWeight="500">
            인증하기
          </AuthBtn>
        </form>
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
  gap: 8px;
`;
const InputBox = styled.input`
  padding: 12px 16px;
  margin-right: 8px;
  ::placeholder {
    color: ${({ theme }) => theme.subText};
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }
`;
const QuestionBtn = styled.button``;
const AuthBtn = styled(Button)``;
