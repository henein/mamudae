import styled from 'styled-components';
import Logo from '../../component/Logo';
import RegisterForm from '../../containers/RegisterPage/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Container>
      <SignUpTitle>
        <Logo size="small" />
      </SignUpTitle>
      <RegisterForm />
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
