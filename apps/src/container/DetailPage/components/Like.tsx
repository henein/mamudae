import React from "react";
import Image from "next/image";
import styled from "styled-components";
import heart from "/public/detailPageImages/Frame 80.png";

const Like = () => {
  return (
    <Container>
      <LikeImg src={heart} alt="none" />
      10
    </Container>
  );
};

export default Like;

const Container = styled.div`
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
`;
const LikeImg = styled(Image)`
  padding: 8px 8px;
  &:hover {
    color: red;
  }
`;
