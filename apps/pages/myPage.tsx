import MyPage from "../src/containers/MyPage/MyPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../src/api/announce";

const myPage = () => {
  return <MyPage />;
};

export default myPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
