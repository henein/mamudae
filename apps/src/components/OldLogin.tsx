import React from "react";
import styled, { css } from "styled-components";
import { customColor } from "../constants/customColor";
import { FieldValues, useForm } from "react-hook-form";

const OldLogin = () => {
  const { register, handleSubmit } = useForm();
  const submit = (data: FieldValues) => {
    alert(JSON.stringify(data));
  };
  return (
    <LoginForm onSubmit={handleSubmit(submit)}>
      <Id type="text" {...register("id")} placeholder="이메일" />
      <Password
        type="password"
        {...register("password")}
        placeholder="비밀번호"
      />
      <LoginBtn type="submit">로그인</LoginBtn>
    </LoginForm>
  );
};

export default OldLogin;

const LoginBtn = styled.button`
  border-radius: 32px;
  border: none;
  background-color: ${customColor.orange};
  width: 252px;
  height: 39px;
  font-size: 12px;
  font-weight: 900;
  color: white;
  &:hover {
    background-color: ${customColor.darkOrange};
  }
  &:active {
    transform: scale(0.98);
  }
`;
const loginContentCss = css`
  width: 252px;
  height: 39px;
  border-radius: 32px;
  margin-bottom: 6px;
  padding-left: 13px;
  border: 1px solid ${customColor.whiteGray};
  ::placeholder {
    color: ${customColor.gray};
  }
`;
const Id = styled.input`
  ${loginContentCss}
`;
const Password = styled.input`
  ${loginContentCss}
`;
const LoginForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  width: 300px;
  height: 173px;
  justify-content: center;
`;
