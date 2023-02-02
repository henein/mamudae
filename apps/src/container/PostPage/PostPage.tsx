import React from "react";
import styled from "styled-components";
import Login from "../../components/Login";
import BoardTitle from "./components/BoardTitle";
import UserPostList from "./components/UserPostList";
import MoreInfoBox from "./components/MoreInfoBox";

const PostPage = () => {
  return (
    <Layout>
      <BoardContent>
        <BoardTitle />
        <UserPostList />
        <MoreInfoBox />
      </BoardContent>
      <Aside>
        <Login />
      </Aside>
    </Layout>
  );
};

export default PostPage;

const Layout = styled.div`
  font-family: "Inter";
  font-style: normal;
  display: flex;
  justify-content: space-between;
  width: 1140px;
  margin: 0 auto;
  background-color: white;
  box-sizing: border-box;
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
  background-color: white;
`;
