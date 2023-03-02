import React from "react";
import styled from "styled-components";
import BoardTitle from "./components/BoardTitle";
import UserPostList from "./components/UserPostList";
import MoreInfoBox from "./components/MoreInfoBox";
import Announcement from "../../components/AnnounceComponent/Announcement";
import Login from "../common/Login";

const PostPage = () => {
  return (
    <Layout>
      <Announcement />
      <PostPageSet>
        <BoardContent>
          <BoardTitle />
          <UserPostList />
          <MoreInfoBox />
        </BoardContent>
        <Aside>
          <Login />
        </Aside>
      </PostPageSet>
    </Layout>
  );
};

export default PostPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1140px;
  margin: 0 auto;
  box-sizing: border-box;
`;
const PostPageSet = styled.div`
  display: flex;
  gap: 32px;
`;
const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  border-top: none;
  border-radius: 32px;
  width: 808px;
  height: 872px;
  box-sizing: border-box;
  z-index: 0.5;
`;
const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
