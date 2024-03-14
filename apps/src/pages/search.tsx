import React from "react";
import SearchPage from "../containers/SearchPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../api/announce";

const Search = () => {
  return <SearchPage />;
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
