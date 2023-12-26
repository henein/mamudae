import styled from 'styled-components';
import Logo from '../../component/Logo';
import RegisterForm from '../../containers/RegisterPage/components/RegisterForm';
import { useState } from 'react';

const RegisterPage = () => {
  const [current, setCurrent] = useState<'email' | 'password'>('email');

  const getCurrentForm = () => {
    switch (current) {
      case 'email':
        return <RegisterForm />;
      // case 'password':
      //   return <PasswordForm />;
      default:
        return <RegisterForm />;
    }
  };

  return (
    <Container>
      <SignUpTitle>
        <Logo size="small" />
      </SignUpTitle>
      {getCurrentForm()}
    </Container>
  );
};

export default RegisterPage;

const SignUpTitle = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 42px;
`;
