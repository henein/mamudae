import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
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
  top: 22%;
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
