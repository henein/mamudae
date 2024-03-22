import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "./components/Login";
import { Logo } from "../../component/Logo";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Container>
      <Logo />
      <LoginForm />
      <SignUpContents>
        <LeftBtn>아직 계정이 없으신가요?</LeftBtn>
        <Link href="/register">
          <RightBtn>회원가입</RightBtn>
        </Link>
      </SignUpContents>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 24px;
  background-color: ${({ theme }) => theme.loginBackground};
`;

const SignUpContents = styled.div`
  display: flex;
  gap: 4px;
  align-items: baseline;
`;

const LeftBtn = styled.p`
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
`;

const RightBtn = styled.a`
  font-size: 12px;
  color: ${({ theme }) => theme.brand};
  font-weight: 900;
`;
