import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { BoardInfoType } from "../MainPage";

const BoardHead = ({ board_title }: BoardInfoType) => {
  return (
    <BoardHeader>
      <Link href={`postlist/${board_title}`}>
        <Title>
          {board_title}
          <ImgDiv>
            <Image src='/chevron_right.svg' width='6' height='10' alt='' />
          </ImgDiv>
        </Title>
      </Link>
    </BoardHeader>
  );
};
export default BoardHead;

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 60px;
  border-radius: 32px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0 2px 3px rgba(255, 128, 56, 0.2);
  padding-left: 24px;
`;
const Title = styled.h3`
  display: flex;
  color: #ff8038;
  font-weight: bold;
  font-size: 18px;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;
