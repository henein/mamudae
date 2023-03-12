import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Board from "../../component/Board";
import Login from "../../component/Login";
import Like from "./components/Like";
import Title from "./components/Title";
import Write from "./components/Write";
import Comment from "./components/Comment";
import { useDetail } from "../../hooks/detailPageHooks/useDetail";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
import Announcement from "../../component/AnnounceComponent/Announcement";

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  // Hybrid Rendering
  const { title, text, recommend, name, views } = useDetail({ id });

  return (
    <Container>
      <Announcement />
      <WriteBox>
        <Wrapper>
          <Title title={title} name={name} views={views} />
          <Content>
            {text}
            <Like recommend={recommend} />
          </Content>
        </Wrapper>
      </WriteBox>

      <SideBox>
        {/* <CompleteLogin /> */}
        <Login />
        <Board />
      </SideBox>

      <CommentBox>
        <Write />
        {/*
            총 댓글 정보들 받아서 map핑 ㄱㄱ
          */}
        <Comments>
          <Comment />
          <Comment />
          <Comment />
        </Comments>
      </CommentBox>
    </Container>
  );
};

export default DetailPage;

const Comments = styled.div`
  padding: 20px 24px;
`;
const Wrapper = styled.div`
  min-height: calc(100% + 22px);
  position: relative;
`;
const Content = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 8px;
  line-height: 18px;
`;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 12px;
  }
`;

const CommentBox = styled.div`
  margin-top: 20px;
  background-color: ${customColor.white};
  width: 808px;
  border-radius: 32px;
  ::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid ${customColor.whiteGray};
  display: flex;
  flex-direction: column;
`;
const WriteBox = styled.div`
  border-radius: 32px;
  background-color: ${customColor.white};
  border: 1px solid ${customColor.whiteGray};
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  width: 808px;
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
