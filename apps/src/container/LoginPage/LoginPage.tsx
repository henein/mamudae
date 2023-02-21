import React from "react";
import styled from "styled-components";
import Login from "./components/Login";

const LoginPage = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
