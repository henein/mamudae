import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import reComment from "/public/detailPageImages/reComment.png";
import { customColor } from "../../../constants/customColor";
import CommentMenuIcon from "./CommentMenuIcon";
import timeDifference from "../../../utils/timeDifference";
import CommentForm from "./CommentForm";
import ModifyCommentForm from "./ModifyCommentForm";
import { useMine } from "../../../hooks/detailPageHooks/useDetail";
import Label from "../../../component/Label";

const ReComments = ({ ...data }) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isModifyRClick, setIsModifyRClick] = useState<boolean>(false);

  const isMine = useMine(data.uid);

  console.log(data);
  return (
    <Container>
      <ReComment src={reComment} alt="none" />
      <CommentBox>
        {isModifyRClick ? (
          <>
            <ModifyCommentForm
              setIsModifyClick={setIsModifyRClick}
              isRecomment={true}
            />
          </>
        ) : (
          <>
            <CommentHeader>
              <UserInfo>
                <NickName isMine={isMine}>{data.userName}</NickName>
                <Label type={data.roleInBoard} />
                <Time>{timeDifference(data.modifiedDate)}</Time>
              </UserInfo>
              <CommentMenuIcon
                boardId={data.boardId}
                comment={data.comment}
                commentId={data.commentId}
                replyId={data.replyId}
                isMine={isMine}
                isRecomment={true}
                tag={data.tag}
                setIsModifyClick={setIsModifyRClick}
              />
            </CommentHeader>
            <CommentContent>
              {data.tag ? (
                <NormalSpan>
                  <TagSpan>{"@" + data.tag}</TagSpan>
                  {data.comment}
                </NormalSpan>
              ) : (
                data.comment
              )}
            </CommentContent>
            <FormDisplay>
              <ReCommentBtn onClick={() => setIsClick(true)}>답글</ReCommentBtn>
              {isClick && (
                <CommentForm
                  setIsClick={setIsClick}
                  boardId={data.boardId}
                  commentId={data.parentCommentId}
                  isRecomment={true}
                  userName={data.userName}
                />
              )}
            </FormDisplay>
          </>
        )}
      </CommentBox>
    </Container>
  );
};

export default ReComments;
const Container = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
`;
const ReComment = styled(Image)``;
const ReCommentBtn = styled.button`
  color: ${(prop) => prop.theme.subText};
  font-size: 12px;
  text-align: start;
  &:hover {
    color: ${customColor.moreDarkGray};
    font-weight: 900;
  }
`;
const FormDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Time = styled.div`
  color: ${(prop) => prop.theme.subText};
  font-size: 12px;
`;

const NickName = styled.div<{ isMine: boolean }>`
  color: ${({ theme, isMine }) => (isMine ? theme.brand : theme.text)};
  font-size: 12px;
`;

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 4px;
`;
const CommentContent = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${(prop) => prop.theme.text};
`;
const NormalSpan = styled.pre``;
const TagSpan = styled.span`
  color: ${({ theme }) => theme.mentionText};
  margin-right: 4px;
`;
