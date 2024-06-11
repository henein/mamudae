import React from 'react';
import styled from 'styled-components';
import BoardTitle from './components/BoardTitle';
import UserPostList from '../../component/UserPostList';
import MoreInfoBox from '../../component/MoreInfoBox';
import Login from '../../component/LoginComponent/Login';
import Button from '../../component/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useGetEachBoard } from '../../hooks/board/useGetBoard';

const PostPage = () => {
  const router = useRouter();
  const boardType = router.query.post === '전체' ? 'ALL' : router.query.post;
  const { data } = useGetEachBoard(
    boardType as string,
    Number(router.query.page) || 1
  );
  return (
    <Layout>
      <PostPageSet>
        <Aside>
          <Aside>
            <Login />
          </Aside>
        </Aside>
        <BoardContent>
          <ContentSet>
            <BoardTitle title={router.query.post as string} />
            <UserPostList data={data} type="postPage" pageNums={0} />
          </ContentSet>
          <MoreInfoBox isRouterPaging={true} data={data} />
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
  width: 100%;
  box-sizing: border-box;
  max-width: 1140px;
  margin: 0px auto;
`;
const PostPageSet = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
`;
export const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-sizing: border-box;
  z-index: 0.5;
  background-color: ${({ theme }) => theme.card};
  width: 100%;
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
