import React from "react";
import styled from "styled-components";
import BoardTitle from "./components/BoardTitle";
import UserPostList from "./components/UserPostList";
import MoreInfoBox from "./components/MoreInfoBox";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/Login";
import Button from "../../component/Button";
import { customColor } from "../../constants/customColor";

const PostPage = () => {
  return (
    <Layout>
      <Announcement />
      <PostPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardContent>
          <ContentSet>
            <BoardTitle />
            <UserPostList />
          </ContentSet>
          <MoreInfoBox />
        </BoardContent>
      </PostPageSet>

      <WriteBtn
        type='submit'
        sort='main'
        width='81px'
        height='41px'
        size={14}
        fontWeight='700'
      >
        작성하기
      </WriteBtn>
    </Layout>
  );
};

export default PostPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  justify-content: space-between;
  border: 1px solid ${customColor.whiteGray};
  border-top: none;
  border-radius: 32px;
  width: 808px;
  height: 872px;
  box-sizing: border-box;
  z-index: 0.5;
`;
const ContentSet = styled.div`
  display: flex;
  flex-direction: column;
`;
const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
const WriteBtn = styled(Button)`
  margin-top: 16px;
`;
