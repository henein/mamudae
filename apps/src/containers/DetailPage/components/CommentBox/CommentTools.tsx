import React, { useEffect, Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import useCommentInfoState from '../../../../../store/comment/commentInfo';
import useCommentWarningModalState from '../../../../../store/modal/commentWarning';
import useReportBoxModalState from '../../../../../store/modal/reportBox';

interface CommentToolsType {
  isMine: boolean;
  commentInfo: any;
  setIsHover: Dispatch<SetStateAction<boolean>>;
  setIsModifyClick: Dispatch<SetStateAction<boolean>>;
}

const CommentTools = ({ ...props }: CommentToolsType) => {
  const { setCommentInfo } = useCommentInfoState();
  useEffect(() => {
    setCommentInfo(props.commentInfo);
  }, [props.commentInfo]);

  const { open: openCommentWarning } = useCommentWarningModalState();
  const { open: openReport } = useReportBoxModalState();

  return (
    <Container>
      <Functions>
        {props.isMine ? (
          <>
            <Modify onClick={() => props.setIsModifyClick(true)}>
              수정하기
            </Modify>
            <Delete onClick={() => openCommentWarning('delete')}>
              삭제하기
            </Delete>
          </>
        ) : (
          <>
            <Report
              onClick={() => {
                props.commentInfo.isRecomment
                  ? openReport('Reply', props.commentInfo.replyId)
                  : openReport('Comment', props.commentInfo.commentId);
              }}
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
