import React from "react";
import styled, { css } from "styled-components";
import { customColor } from "../../../constants/customColor";


const CommentTools = () => {
  return (
    <Container>
      <Functions>
        <Modify>수정</Modify>
        <Delete>삭제</Delete>
        <Report>신고</Report>
      </Functions>
    </Container>
  );
};

export default CommentTools;

const FunctionsCss = css`
  padding: 4px 12px;
  font-size: 10px;
  width: 100%;
  text-align: center;
`;
const Report = styled.div`
  ${FunctionsCss}
`;
const Delete = styled.div`
  ${FunctionsCss}
`;
const Modify = styled.div`
  ${FunctionsCss}
`;
const Functions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
`;
const Container = styled.div`
  width: 90px;
  height: 62px;
  border: 1px solid ${customColor.whiteGray};
  box-shadow: 0 2px 4px ${customColor.shadow};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  bottom: -100px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  &:after {
    content: "";
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${customColor.whiteGray};
    position: absolute;
    top: -8px;
    left: calc(50% - 8px);
  }
`;
