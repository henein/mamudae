import React, { useEffect, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { useLocalStorage } from "../../../hooks/storage/useLocalStorage";
import { onWarnings } from "../../../../store/warningSlice/onWarning";
import { useDispatch } from "react-redux";
import { commentInfoSet } from "../../../../store/warningSlice/commentInfo";
import { WarningState } from "../DetailPage";

interface CommentToolsType {
  boardId: string;
  commentId: string;
  isMine: boolean;
  commentInfo: any;
  setIsHover: Dispatch<SetStateAction<boolean>>;
  setIsModifyClick: Dispatch<SetStateAction<boolean>>;
}
const CommentTools = ({ ...props }: CommentToolsType) => {
  console.log(props.commentInfo);
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");

  const dispatch = useDispatch();

  const btnClick = ({ btnType, location }: WarningState) => {
    if (!accessToken) {
      alert("로그인 후 이용 가능합니다.");
      window.location.reload();
      return;
    } else {
      if (btnType == "modify") props.setIsModifyClick(true);
      else
        dispatch(
          onWarnings({ warningType: btnType, warningLocation: location })
        );
      props.setIsHover(false); // commentTools 닫힘
    }
  };

  useEffect(() => {
    if (props.commentInfo) {
      dispatch(commentInfoSet(props.commentInfo));
    }
  }, [props.commentInfo, dispatch]);

  return (
    <Container>
      <Functions>
        {props.isMine ? (
          <>
            <Modify
              onClick={() =>
                btnClick({ btnType: "modify", location: "comment" })
              }
            >
              수정하기
            </Modify>
            <Delete
              onClick={() =>
                btnClick({ btnType: "delete", location: "comment" })
              }
            >
              삭제하기
            </Delete>
          </>
        ) : (
          <>
            <Report
              onClick={() =>
                btnClick({ btnType: "report", location: "comment" })
              }
            >
              신고하기
            </Report>
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
const Container = styled.div`
  width: 81px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0px 4px 8px 0px ${({ theme }) => theme.boxShadow};
  border-radius: 0px 16px 16px 16px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  right: -80px;
  top: 20px;
  background-color: ${({ theme }) => theme.cardHeader};
  box-sizing: border-box;
`;
