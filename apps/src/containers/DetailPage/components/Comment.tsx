import React, { useState } from "react";
import styled from "styled-components";
import CommentMenuIcon from "./CommentMenuIcon";
import { customColor } from "../../../constants/customColor";
import ReComments from "./ReComments";
import timeDifference from "../../../utils/timeDifference";
import { CommentType } from "../DetailPage";
import CommentForm from "./CommentForm";

// 작성자 본인인지 아닌지, 닉네임, 층, 직업, 시간, 대댓글인지 새로운 댓글인지
// 마지막 댓글인지?
const Comment = ({ ...data }) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const replyBtnClick = () => {
    setIsClick(true);
  };
  return (
    <Container>
      <CommentBox isLastComment={data.isLastComment}>
        <CommentHeader>
          <UserInfo>
            <NickName>{data.userName}</NickName>
            <Floor>48층</Floor>
            <Job>겸마 격수</Job>
            <Time>{timeDifference(data.modifiedDate)}</Time>
          </UserInfo>
          <CommentMenuIcon
            boardId={data.boardId}
            comment={data.comment}
            commentId={data.commentId}
          />
        </CommentHeader>
        <CommentContent>{data.comment}</CommentContent>
        <div>
          <FormDisplay>
            <ReCommentBtn onClick={replyBtnClick}>답글</ReCommentBtn>
            {isClick && (
              <CommentForm
                setIsClick={setIsClick}
                boardId={data.boardId}
                commentId={data.commentId}
                isRecomment={true}
                userName={data.userName}
              />
            )}
          </FormDisplay>
          {data.replies.map((item: CommentType, idx: number) => {
            return (
              <ReComments
                boardId={data.boardId}
                comment={item.comment}
                userName={item.userName}
                modifiedDate={item.modifiedDate}
                tag={item.tag}
                replyId={item.replyId}
                parentCommentId={data.commentId}
                key={idx}
              />
            );
          })}
        </div>
      </CommentBox>
    </Container>
  );
};

export default Comment;

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

const Container = styled.div`
  display: flex;
`;

const Job = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 4px;
  color: ${customColor.white};
  background-color: ${customColor.labelBlack};
`;
const Time = styled.div`
  color: ${(prop) => prop.theme.subText};
  font-size: 12px;
`;
const Floor = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 4px;
  color: ${customColor.white};
  background-color: ${customColor.floor};
`;
const NickName = styled.div`
  color: ${(prop) => prop.theme.text};
  margin-right: 4px;
  font-size: 12px;
`;

const CommentBox = styled.div<{ isLastComment: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: ${({ isLastComment }) => !isLastComment && "14px"};
  border-bottom: ${({ theme, isLastComment }) =>
    !isLastComment && `1px solid ${theme.divider}`};
  margin-bottom: ${({ isLastComment }) => !isLastComment && "20px"};
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
`;
const CommentContent = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${(prop) => prop.theme.text};
`;
