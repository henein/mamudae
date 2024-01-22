import MyPage from "../containers/MyPage/MyPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../api/announce";
import {
  getMyBoard,
  getMyCommentBoard,
  getAllMyChar,
} from "../api/userInfo";

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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
