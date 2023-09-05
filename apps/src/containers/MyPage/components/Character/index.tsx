import React, { useState } from "react";
import styled from "styled-components";
import CharSelectBox from "./CharSelectBox";
import Button from "../../../../component/Button";
import Image from "next/image";
import {
  useGetAllMyChar,
  useGetCharName,
} from "../../../../hooks/myPageHooks/useUserChar";

const MyChar = () => {
  const [apiKey, setApiKey] = useState<string>("");

  // const char = useGetAllMyChar({});
  // console.log(char);
  const { mutate } = useGetCharName({
    key: apiKey,
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // await setApiKey(e.target.value);
    // await mutate();
    console.log(e.target);
  };

  console.log(apiKey);
  return (
    <Container>
      <CharSelectBox type="인증" />
      {/* <CharSelectBox type="미인증" /> */}

      <UserAuthLine>
        <QuestionBtn>
          <Image
            src="/myPageImages/question.svg"
            width="20"
            height="21"
            alt=""
          />
        </QuestionBtn>
        <BottomForm onSubmit={onSubmit}>
          <InputBox placeholder="토큰" />
          <AuthBtn sort="primary" type="button" width="83px" fontWeight="500">
            인증하기
          </AuthBtn>
        </BottomForm>
      </UserAuthLine>
    </Container>
  );
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJYLUFwcC1SYXRlLUxpbWl0IjoiNTAwOjEwIiwiYWNjb3VudF9pZCI6IjExNzc3NjAyMSIsImF1dGhfaWQiOiIyIiwiZXhwIjoxNzA5MTA4NDA4LCJpYXQiOjE2OTM1NTY0MDgsIm5iZiI6MTY5MzU1NjQwOCwic2VydmljZV9pZCI6IjQzMDAxMTM5NyIsInRva2VuX3R5cGUiOiJBY2Nlc3NUb2tlbiJ9.XMOX4gvZpjUoQeKszzhvzlE0cF8KkVLvaRuoI7ByEHg

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
  color: ${({ theme }) => theme.text};
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
