import React, { useEffect } from "react";
import styled from "styled-components";
import BoardTitle from "./components/BoardTitle";
import UserPostList from "../../component/UserPostList";
import MoreInfoBox from "../../component/MoreInfoBox";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/LoginComponent/Login";
import Button from "../../component/Button";
import { useRouter } from "next/router";
import { useEachPost } from "../../hooks/postPageHooks/usePostPage";
import Link from "next/link";

const PostPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    switch (router.query.post) {
      case '전체':
      case '자유':
      case '유머':
      case '보스':
      case '직업':
        break;
      default:
        router.push('/404');
        break;
    }
  }, [router.isReady, router.query.post, router]);

  const { data, refetch } = useEachPost();
  console.log(data);
  return (
    <Layout>
      <Announcement />
      <PostPageSet>
        <Aside>
          <Aside>
            <Login />
          </Aside>
        </Aside>
        <BoardContent>
          <ContentSet>
            <BoardTitle />
            <UserPostList data={data} type="postPage" pageNums={0} />
          </ContentSet>
          <MoreInfoBox pageType={"postPage"} data={data} refetch={refetch} />
        </BoardContent>
      </PostPageSet>

      <Link href="/write">
        <WriteBtn type="submit" sort="primary">
          작성하기
        </WriteBtn>
      </Link>
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
export const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  width: 808px;
  height: 872px;
  box-sizing: border-box;
  z-index: 0.5;
  background-color: ${({ theme }) => theme.card};
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
