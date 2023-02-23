import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
import SignUp from "./components/SignUp";

const SignUpPage = () => {
  return (
    <Container>
      <SignUpTitle>Henein</SignUpTitle>
      <SignUp />
    </Container>
  );
};

export default SignUpPage;

const SignUpTitle = styled.span`
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
