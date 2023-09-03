import React from "react";
import styled from "styled-components";
import Login from "./components/Login";
import Logo from "../../component/Logo";
const LoginPage = () => {
  return (
    <Container>
      <LeftDiv>
        <Logo size="big" />
      </LeftDiv>
      <RightDiv>
        <Login />
      </RightDiv>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 960px;
  height: 100vh;
  background-color: #f9faff;
`;
const RightDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 960px;
  height: 100vh;
  background-color: #e0e1e6;
`;
