import React from "react";
import PostPage from "../../../containers/PostPage/PostPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../../../api/announce";

const PostList = () => {
  return <PostPage />;
};

export default PostList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
