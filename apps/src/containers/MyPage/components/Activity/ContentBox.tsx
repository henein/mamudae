import React, { useState } from "react";
import styled from "styled-components";
import { BoxContent, Title } from "../Character/CharSelectBox";
import { BoardContent } from "../../../PostPage/PostPage";
import UserPostList from "../../../../component/UserPostList";
import MoreInfoBox from "../../../../component/MoreInfoBox";

interface ContentBoxType {
  type: "게시글" | "댓글 단 게시글";
  data: any;
}

const ContentBox = ({ type, data }: ContentBoxType) => {
  const [pageNums, setPageNums] = useState<number>(1);

  return (
    <Container>
      <Title>{type}</Title>
      <Content>
        <ContentSet>
          <UserPostList data={data} type="myPage" pageNums={pageNums} />
        </ContentSet>
        {/* 페이지네이션 데이터를 data로 받기 */}
        <MoreInfoBox
          isRouterPaging={false}
          data={data}
          pageNums={pageNums}
          setPageNums={setPageNums}
        />
      </Content>
    </Container>
  );
};

export default ContentBox;

const Container = styled(BoxContent)`
  width: 100%;
`;
const ContentSet = styled.div`
  height: auto;
  overflow-y: hidden;
`;
const Content = styled(BoardContent)`
  height: 446px;
`;
