import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import useDarkMode from "../../../hooks/reduxHooks/useDarkMode";

const Write = () => {
  const darkModeState = useDarkMode();

  const { register, handleSubmit } = useForm();
  const submit = (data: FieldValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <WriteForm onSubmit={handleSubmit(submit)} darkModeState={darkModeState}>
      <NumberOfComments>댓글 2개</NumberOfComments>
      <WriteComment
        {...register("comment")}
        type="text"
        placeholder="댓글 작성"
      />
    </WriteForm>
  );
};

export default Write;

const WriteComment = styled.input`
  padding: 12px 8px;
  border-radius: 16px;
  border: 1px solid ${(prop) => prop.theme.border};
  background-color: ${(prop) => prop.theme.input};
  ::placeholder {
    color: ${(prop) => prop.theme.subText};
  }
`;
const NumberOfComments = styled.p`
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 16px;
  color: ${(prop) => prop.theme.Text};
`;
const WriteForm = styled.form<{ darkModeState: boolean }>`
  z-index: 1;
  top: 0;
  box-shadow: 0px 4px 8px
    ${({ darkModeState, theme }) => (darkModeState ? "none" : theme.shadow)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  min-height: 97px;
  border-bottom: 1px solid ${customColor.whiteGray};
  padding: 0 24px;
  position: sticky;
  background-color: ${(prop) => prop.theme.cardHeader};
`;
