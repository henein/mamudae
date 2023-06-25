import React, { useState } from "react";
import styled, { css } from "styled-components";
import { customColor } from "../../../constants/customColor";
import {
  useDelComment,
  useDelReComment,
} from "../../../hooks/detailPageHooks/useComment";
import { PComment, RComment } from "../../../api/comment";

// boardId, comment, commentId, accessToken,userData;
const CommentTools = ({ ...props }: any) => {
  // const { delComments } = useDelComment(); // 댓글 del api

  return (
    <Container isMyComment={props.isMyComment}>
      <Functions>
        {props.isMyComment ? (
          <>
            <Modify>수정하기</Modify>
            <Delete>삭제하기</Delete>
          </>
        ) : (
          <Report>신고하기</Report>
        )}
      </Functions>
    </Container>
  );
};

export default CommentTools;

const FunctionsCss = css`
  padding: 4px 16px;
  font-size: 13px;
  width: 100%;
  text-align: center;
`;
const Report = styled.div`
  ${FunctionsCss}
  color: ${({ theme }) => theme.danger};
`;
const Delete = styled.div`
  ${FunctionsCss}
  color: ${({ theme }) => theme.danger};
`;
const Modify = styled.div`
  ${FunctionsCss}
`;
const Functions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0px;
  color: ${({ theme }) => theme.text};
`;
const Container = styled.div<{ isMyComment: boolean }>`
  width: 81px;
  border: 1px solid ${customColor.whiteGray};
  box-shadow: 0px 4px 8px 0px ${({ theme }) => theme.boxShadow};
  border-radius: 16px 16px 0px 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  top: ${({ isMyComment }) => (isMyComment ? "-65px" : "-40px")};
  left: -61px;
  z-index: 1;
  background-color: ${({ theme }) => theme.cardHeader};
  box-sizing: border-box;
`;
