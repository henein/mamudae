import React, { useEffect, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { customColor } from "../../../constants/customColor";
import { useLocalStorage } from "../../../hooks/storage/useLocalStorage";
import { onWarnings } from "../../../../store/warningSlice/onWarning";
import { useDispatch } from "react-redux";
import { commentInfoSet } from "../../../../store/warningSlice/commentInfo";

interface CommentToolsType {
  boardId: string;
  commentId: string;
  isMyComment: boolean;
  commentInfo: any;
  setIsHover: Dispatch<SetStateAction<boolean>>;
  setIsModifyClick: Dispatch<SetStateAction<boolean>>;
}
const CommentTools = ({ ...props }: CommentToolsType) => {
  console.log(props);
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");

  const dispatch = useDispatch();

  console.log(props.commentInfo);
  const btnClick = (btnType: string) => {
    if (!accessToken) {
      // alert("로그인 후 이용 가능합니다.");
      window.location.reload();
      return;
    } else {
      if (btnType == "modify") props.setIsModifyClick(true);
      else dispatch(onWarnings(btnType));
      props.setIsHover(false); // commentTools 닫힘
    }
  };

  useEffect(() => {
    if (props.commentInfo) {
      dispatch(commentInfoSet(props.commentInfo));
    }
  }, [props.commentInfo, dispatch]);

  return (
    <Container isMyComment={props.isMyComment}>
      <Functions>
        {props.isMyComment ? (
          <>
            <Modify onClick={() => btnClick("modify")}>수정하기</Modify>
            <Delete onClick={() => btnClick("delete")}>삭제하기</Delete>
          </>
        ) : (
          <>
            <Report onClick={() => btnClick("report")}>신고하기</Report>
          </>
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
  &:hover {
    cursor: pointer;
  }
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
  border-radius: 0px 16px 16px 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  right: -80px;
  background-color: ${({ theme }) => theme.cardHeader};
  box-sizing: border-box;
`;
