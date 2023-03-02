import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
import Button from "./Button";

const Login = () => {
  return (
    <LoginContainer>
      <LoginBtn
        type="submit"
        sort="main"
        width="252px"
        height="39px"
        size={12}
        fontWeight="900"
      >
        로그인
      </LoginBtn>
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
const LoginBtn = styled(Button)`
  margin-bottom: 16px;
`;

const LoginContainer = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: center;
  background-color: ${customColor.white};
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  width: 300px;
  height: 118px;
`;
