import { Logo } from '../component/Logo';
import LoginForm from '../containers/LoginPage/components/Login';
import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-primary-50">
      <Logo />
      <LoginForm />
      <div className="flex gap-1 items-baseline">
        <p className="text-xs text-">아직 계정이 없으신가요?</p>
        <Link href="/register">
          <RightBtn>회원가입</RightBtn>
        </Link>
      </div>
    </div>
  );
};

const LeftBtn = styled.p`
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
`;

const RightBtn = styled.button`
  font-size: 12px;
  color: ${({ theme }) => theme.brand};
  font-weight: 900;
`;

export default SignInPage;
