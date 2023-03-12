import React from "react";
import PostPage from "../../../src/containers/PostPage/PostPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getApi } from "../../../src/api/postpage";
import { announce } from "../../../src/api/announce";

const PostList = () => {
  return <PostPage />;
};

export default PostList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery("entire", () => getApi("entireboard", 1)),
    queryClient.prefetchQuery("F", () => getApi("F", 1)),
    queryClient.prefetchQuery("B", () => getApi("B", 1)),
    queryClient.prefetchQuery("H", () => getApi("H", 1)),
    queryClient.prefetchQuery("I", () => getApi("I", 1)),
    queryClient.prefetchQuery("announce", () => announce()),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
    },
  };
};
