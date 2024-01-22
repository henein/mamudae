import styled from 'styled-components';
import { Logo } from '../../component/Logo';
import RegisterForm from '../../containers/RegisterPage/components/RegisterForm';
import { useState } from 'react';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <Container>
      <Logo />
      <RegisterForm />
      <SignUpContents>
        <LeftBtn>이미 계정이 있으신가요?</LeftBtn>
        <Link href="/login">
          <RightBtn>로그인</RightBtn>
        </Link>
      </SignUpContents>
    </Container>
  );
};

export default RegisterPage;

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
