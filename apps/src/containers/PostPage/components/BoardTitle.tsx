import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { customColor } from "../../../constants/customColor";

const BoardTitle = () => {
  const router = useRouter();
  return (
    <>
      <BoardTit>
        <TitleText>{router.query.post}</TitleText>
      </BoardTit>
    </>
  );
};
export default BoardTitle;

const BoardTit = styled.div`
  background-color: ${({ theme }) => theme.cardHeader};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  border-radius: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 1;
  box-shadow: 0 2px 3px ${customColor.boardShadow};
`;
const TitleText = styled.div`
  color: ${({ theme }) => theme.Text};
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-left: 24px;
`;
