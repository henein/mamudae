import React from "react";
import styled from "styled-components";
import Image from "next/image";
import reComment from "/public/detailPageImages/reComment.png";
import { customColor } from "../../../constants/customColor";
import CommentMenuIcon from "./CommentMenuIcon";

const ReComments = () => {
  return (
    <Container>
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
        <div>
          <ReCommentBtn>답글</ReCommentBtn>
        </div>
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
  color: ${(prop) => prop.theme.Text};
  margin-right: 4px;
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
`;
const CommentContent = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${(prop) => prop.theme.Text};
`;
