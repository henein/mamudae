import { useRouter } from "next/router";
import React from "react";
import Like from "./components/Like";
import Title from "./components/Title";
import Write from "./components/Write";
import Comment from "./components/Comment";
import { useDetail } from "../../hooks/detailPageHooks/useDetail";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import CompleteLogin from "../../component/CompleteLogin";

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const options = { enabled: false };
  // Hybrid Rendering
  const { title, text, recommend, name, views, createTime } = useDetail({
    id,
    options,
  });

  return (
    <Container>
      <Announcement />
      <WriteBox>
        <Wrapper>
          <Title
            title={title}
            name={name}
            views={views}
            createTime={createTime}
          />
          <Content dangerouslySetInnerHTML={{ __html: text }} />
          <Like recommend={recommend} id={id} />
        </Wrapper>
      </WriteBox>

      <SideBox>
        <CompleteLogin />
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
  display: flex;
  flex-direction: column;
  min-height: calc(100% + 21px);
  position: relative;
`;
const Content = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 8px;
  line-height: 18px;
  color: ${(prop) => prop.theme.Text};
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
  background-color: ${(prop) => prop.theme.card};
  width: 808px;
  border-radius: 32px;
  ::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid ${(prop) => prop.theme.border};
  display: flex;
  flex-direction: column;
`;
const WriteBox = styled.div`
  border-radius: 32px;
  background-color: ${(prop) => prop.theme.card};
  border: 1px solid ${(prop) => prop.theme.border};
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
