import React from "react";
import styled from "styled-components";
import Logo from "../../component/Logo";
import { customColor } from "../../constants/customColor";
import SignUp from "./components/SignUp";

const SignUpPage = () => {
  return (
    <Container>
      <SignUpTitle>
        <Logo size="small" />
      </SignUpTitle>
      <SignUp />
    </Container>
  );
};

export default SignUpPage;

const SignUpTitle = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 42px;
`;
