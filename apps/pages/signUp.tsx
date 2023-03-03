import React from "react";
import styled from "styled-components";
import SignUp from "../src/components/SignUpPage/SignUp";
import { customColor } from "../src/constants/customColor";

const signUp = () => {
  return (
    <Container>
      <SignUpTitle>Henein</SignUpTitle>
      <SignUp />
    </Container>
  );
};

export default signUp;

const SignUpTitle = styled.span`
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
