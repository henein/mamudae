import React, { useState } from "react";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import CommentMenuIcon from "./CommentMenuIcon";
import Image from "next/image";
import reComment from "/public/detailPageImages/reComment.png";
import CommentTools from "./CommentTools";

const Comment = () => {
  // 작성자 본인인지 아닌지, 닉네임, 층, 직업, 시간, 대댓글인지 새로운 댓글인지
  return (
    <Container>
      <Comments>
        <ReComment src={reComment} alt="none" />

        <CommentBox>
          <CommentHeader>
            <UserInfo>
              <NickName>임송재</NickName>
              <Floor>48층</Floor>
              <Job>겸마 격수</Job>
              <Time>ㆍ3일 전</Time>
            </UserInfo>
            <CommentMenuIcon />
          </CommentHeader>
          <CommentContent>안녕하세요</CommentContent>
        </CommentBox>
      </Comments>
    </Container>
  );
};

export default Comment;

const Comments = styled.div`
  display: flex;
  margin-top: 20px;
`;
const ReComment = styled(Image)`
  margin-right: 12px;
`;

const Job = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 4px;
  color: ${customColor.white};
  background-color: ${customColor.tagBlack};
`;
const Time = styled.div`
  color: ${customColor.darkGray};
  font-size: 12px;
`;
const Floor = styled.div`
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 4px;
  color: ${customColor.white};
  background-color: ${customColor.tagBlue};
`;
const NickName = styled.div`
  color: ${customColor.darkGray};
  margin-right: 4px;
  font-size: 12px;
`;

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 14px;
  border-bottom: 1px solid ${customColor.gray};
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
`;

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
`;
