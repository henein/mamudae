import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { announce } from '../../api/announce';
import UserPage from '../../containers/UserPage';

const User = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <UserPage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { nickname } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('announce', () => announce());
  const page = context.query.page || 1;

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
      nickname,
      page,
    },
  };
};

export default User;
