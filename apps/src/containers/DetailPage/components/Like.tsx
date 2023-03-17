import React from "react";
import Image from "next/image";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";

interface ILike {
  recommend: number;
}

const Like = ({ recommend }: ILike) => {
  return (
    <Container>
      <LikeIcon />
      {recommend}
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
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
`;
const LikeImg = styled(Image)`
  &:hover {
    fill: red;
    cursor: pointer;
  }
  padding: 8px 8px;
`;
