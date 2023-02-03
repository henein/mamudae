import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { customColor } from "../../../constants/customColor";

const BoardTitle = () => {
  const router = useRouter();
  return (
    <>
      <BoardTit>
        <TitleText>{router.query.post}</TitleText>
        <ImageMargin>
          <Image src='/edit_square.svg' width='20' height='20' alt='' />
        </ImageMargin>
      </BoardTit>
    </>
  );
};
export default BoardTitle;

const BoardTit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 64px;
  border-radius: 32px;
  border: 1px solid #e6e6e6;
  z-index: 1;
  box-shadow: 0 2px 3px rgba(255, 128, 56, 0.2);
`;
const TitleText = styled.h3`
  color: ${customColor.orange};
  font-weight: bold;
  margin-left: 24px;
  font-size: 18px;
`;
const ImageMargin = styled.div`
  margin-right: 24px;
`;
