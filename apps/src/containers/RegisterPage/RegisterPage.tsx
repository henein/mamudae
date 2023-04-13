import React from "react";
import styled from "styled-components";
import Profile from "./components/Profile";

const RegisterPage = () => {
  return (
    <Container>
      <Title>Henein</Title>
      <Profile />
    </Container>
  );
};

export default RegisterPage;

const Title = styled.span`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 128px;
  color: ${(prop) => prop.theme.Brand};
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
