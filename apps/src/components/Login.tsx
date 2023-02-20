import React from "react";
import styled, { css } from "styled-components";
import { customColor } from "../constants/customColor";

const Login = () => {
  return (
    <LoginContainer>
      <LoginBtn>로그인</LoginBtn>
      <LoginFooter>
        <Text>로그인이 안 되시나요?</Text>
        <SignUpBtn>회원가입</SignUpBtn>
      </LoginFooter>
    </LoginContainer>
  );
};

export default Login;
const Text = styled.span`
  color: ${customColor.darkGray};
  font-size: 12px;
  font-weight: 900;
`;
const SignUpBtn = styled.button`
  color: ${customColor.orange};
  border: none;
  background-color: ${customColor.white};
  font-size: 12px;
  font-weight: 900;
  &:hover {
    cursor: pointer;
  }
`;
const LoginFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const LoginBtn = styled.button`
  border-radius: 32px;
  border: none;
  background-color: ${customColor.orange};
  width: 252px;
  height: 39px;
  font-size: 12px;
  font-weight: 900;
  margin-bottom: 16px;
  color: white;
  &:hover {
    background-color: ${customColor.darkOrange};
    cursor: pointer;
  }
  &:active {
    transform: scale(0.98);
  }
`;
const LoginContainer = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  width: 300px;
  height: 118px;
`;
