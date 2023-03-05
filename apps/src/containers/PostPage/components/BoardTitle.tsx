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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${customColor.white};
  height: 64px;
  border-radius: 32px;
  border: 1px solid ${customColor.whiteGray};
  z-index: 1;
  box-shadow: 0 2px 3px ${customColor.shadow};
`;
const TitleText = styled.div`
  color: ${customColor.black};
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-left: 24px;
`;
