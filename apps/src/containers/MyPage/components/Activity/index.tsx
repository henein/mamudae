import React from "react";
import styled from "styled-components";
import ContentBox from "./ContentBox";
const index = () => {
  return (
    <Container>
      <MyBoard />
      <MyComment />
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const MyBoard = styled(ContentBox)``;
const MyComment = styled(ContentBox)``;
