import styled from "styled-components";
import Login from "../src/components/LoginPage/Login";
import { customColor } from "../src/constants/customColor";

const login = () => {
  return (
    <Container>
      <LoginTitle>Henein</LoginTitle>
      <Login />
    </Container>
  );
};

export default login;

const LoginTitle = styled.span`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 128px;
  color: ${customColor.orange};
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
