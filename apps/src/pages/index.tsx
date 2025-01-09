import MainPage from '../containers/MainPage/MainPage';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

export default function Home() {
  return <MainPage />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
