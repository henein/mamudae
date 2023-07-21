import React from "react";
import styled from "styled-components";
import Login from "./components/Login";

const LoginPage = () => {
  return (
    <Container>
      <LoginTitle>Henein</LoginTitle>
      <Login />
    </Container>
  );
};

export default LoginPage;

const LoginTitle = styled.span`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 128px;
  color: ${(prop) => prop.theme.brand};
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
