import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { announce } from '../../api/announce';
import { getMyBoard } from '../../api/userInfo';
import UserPage from '../../containers/UserPage';

const User = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <UserPage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nickname = context.query.nickname as string;
  const queryClient = new QueryClient();
  const page = context.query.page || 1;
  try {
    await queryClient.prefetchQuery('announce', () => announce());
    await queryClient.fetchQuery(['myBoards', nickname], () =>
      getMyBoard(nickname, 1)
    );
    await queryClient.fetchQuery(['myCommentBoards', nickname], () =>
      getMyBoard(nickname, 1)
    );
  } catch (err: any) {
    if (err.response.data.code === 404) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
      nickname,
      page,
    },
  };
};

export default User;
