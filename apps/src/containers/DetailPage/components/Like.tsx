import React from "react";
import Image from "next/image";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";

interface ILike {
  recommend: number;
  boardId: string;
}

const Like = ({ recommend, boardId }: ILike) => {
  return (
    <Container>
      <LikeIcon boardId={boardId} />
      <RecommendNum>{recommend}</RecommendNum>
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
const RecommendNum = styled.span`
  color: #757575;
`;
