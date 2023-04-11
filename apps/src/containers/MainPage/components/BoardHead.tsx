import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { BoardInfoType } from "../MainPage";
import SvgIcon from "@mui/material/SvgIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useDarkMode from "../../../hooks/reduxHooks/useDarkMode";

const BoardHead = ({ board_title }: BoardInfoType) => {
  const darkModeState = useDarkMode();

  return (
    <BoardHeader darkModeState={darkModeState}>
      <Link href={`board/${board_title}`}>
        <Title>
          {board_title}
          <ImgDiv>
            <SvgIcon component={ChevronRightIcon} />
          </ImgDiv>
        </Title>
      </Link>
    </BoardHeader>
  );
};
export default BoardHead;

const BoardHeader = styled.div<{ darkModeState: boolean }>`
  display: flex;
  align-items: center;
  height: 60px;
  border-radius: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.cardHeader};
  z-index: 1;
  box-shadow: 0px 4px 8px
    ${({ darkModeState, theme }) => (darkModeState ? "none" : theme.border)};
  padding-left: 24px;
`;
const Title = styled.h3`
  display: flex;
  color: ${({ theme }) => theme.Text};
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
  color: ${({ theme }) => theme.Brand};
`;
