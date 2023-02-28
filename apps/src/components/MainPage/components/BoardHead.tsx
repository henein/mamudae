import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { BoardInfoType } from "../MainPage";
import { customColor } from "../../../constants/customColor";

const BoardHead = ({ board_title }: BoardInfoType) => {
  return (
    <BoardHeader>
      <Link href={`postlist/${board_title}`}>
        <Title>
          {board_title}
          <ImgDiv>
            <Image
              src='/mainPageImages/chevron_right.svg'
              width='7'
              height='10'
              alt=''
            />
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
  height: 60px;
  border-radius: 32px;
  border: 1px solid ${customColor.whiteGray};
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0 2px 3px ${customColor.shadow};
  padding-left: 24px;
`;
const Title = styled.h3`
  display: flex;
  color: ${customColor.black};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;
