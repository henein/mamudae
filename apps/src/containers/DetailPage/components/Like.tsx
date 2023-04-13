import React from "react";
import Image from "next/image";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";
import { usePostRecommend } from "../../../hooks/detailPageHooks/usePostRecommend";

interface ILike {
  recommend: number;
  id: string;
}

const Like = ({ recommend, id }: ILike) => {
  return (
    <Container>
      <LikeIcon id={id} />
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
  width: 100%;
`;
const LikeImg = styled(Image)`
  &:hover {
    fill: red;
    cursor: pointer;
  }
  padding: 8px 8px;
`;
