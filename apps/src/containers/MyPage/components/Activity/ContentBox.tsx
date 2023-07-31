import React from "react";
import styled from "styled-components";
import { BoxContent, Title } from "../Character/CharSelectBox";
import { BoardContent, ContentSet } from "../../../PostPage/PostPage";
import UserPostList from "../../../../component/UserPostList";
import MoreInfoBox from "../../../../component/MoreInfoBox";

interface ContentBoxType {
  type: "게시글" | "댓글 단 게시글";
}

const ContentBox = ({ type }: ContentBoxType) => {
  return (
    <Container>
      <Title>{type}</Title>
      <Content>
        <ContentSet>
          {/* 유저가 작성한 댓글, 게시물을 api를 통해 data로 받아야함 */}
          <UserPostList data={{ content: [] }} />
        </ContentSet>
        {/* 페이지네이션 데이터를 data로 받기 */}
        <MoreInfoBox data={{ totalPage: 10 }} />
      </Content>
    </Container>
  );
};

export default ContentBox;

const Container = styled(BoxContent)`
  width: 100%;
`;
const Content = styled(BoardContent)`
  height: 456px;
`;
