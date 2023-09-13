import MyPage from "../src/containers/MyPage/MyPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../src/api/announce";
import {
  getMyBoard,
  getMyCommentBoard,
  getProfile,
  getAllMyChar,
} from "../src/api/userInfo";

const myPage = () => {
  return <MyPage />;
};

export default myPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("announce", () => announce());
  await queryClient.prefetchQuery("allMyChar", () => getAllMyChar());
  await queryClient.prefetchQuery("myBoards", () => getMyBoard());
  await queryClient.prefetchQuery("myCommentBoards", () => getMyCommentBoard());
  await queryClient.prefetchQuery("myProfile", () => getProfile());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
