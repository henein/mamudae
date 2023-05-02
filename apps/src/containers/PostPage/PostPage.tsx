import React, { useEffect } from "react";
import styled from "styled-components";
import BoardTitle from "./components/BoardTitle";
import UserPostList from "./components/UserPostList";
import MoreInfoBox from "./components/MoreInfoBox";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/Login";
import Button from "../../component/Button";
import { customColor } from "../../constants/customColor";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import CompleteLogin from "../../component/CompleteLogin";

const PostPage = () => {
  const router = useRouter();
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");
  const { data } = useUserInfo({ accessToken });
  useEffect(() => {
    if (!router.isReady) return;
    switch (router.query.post) {
      case "전체":
      case "자유":
      case "유머":
      case "보스":
      case "직업":
        break;
      default:
        router.push("/404");
        break;
    }
  }, [router.isReady, router.query.post]);

  return (
    <Layout>
      <Announcement />
      <PostPageSet>
        <Aside>
          {data?.username ? <CompleteLogin {...data} /> : <Login />}
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
        type="submit"
        sort="main"
        width="81px"
        height="41px"
        size={14}
        fontWeight="700"
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
  border-radius: 16px;
  width: 808px;
  height: 872px;
  box-sizing: border-box;
  z-index: 0.5;
  background-color: ${customColor.white};
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
