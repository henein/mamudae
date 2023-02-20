import React from "react";
import Image from "next/image";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";

const Like = () => {
  return (
    <Container>
      <LikeIcon />
      10
    </Container>
  );
};

export default Like;

const Container = styled.div`
  margin: 20px auto 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
`;
const LikeImg = styled(Image)`
  &:hover {
    fill: red;
    cursor: pointer;
  }
  padding: 8px 8px;
`;
