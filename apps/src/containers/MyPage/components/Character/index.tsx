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

  const charList = useGetAllMyChar({ refetchOnWindowFocus: false });
  const { mutate } = useGetCharName({
    key: apiKey,
  });
  return (
    <Container>
      <CharSelectBox charList={charList.data} />

      <UserAuthLine>
        <QuestionBtn>
          <Image
            src="/myPageImages/question.svg"
            width="20"
            height="21"
            alt=""
          />
        </QuestionBtn>
        <BottomForm
          onSubmit={(e: any) => {
            e.preventDefault();
            mutate();
          }}
        >
          <InputBox
            placeholder="토큰"
            onChange={(e: any) => setApiKey(e.target.value)}
          />
          <AuthBtn
            sort="primary"
            type="submit"
            width="83px"
            fontWeight="500"
            onClick={(e: any) => {
              e.preventDefault();
              mutate();
            }}
          >
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
