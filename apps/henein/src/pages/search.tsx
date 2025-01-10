import React from 'react';
import SearchPage from '../containers/SearchPage';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { announce } from '../api/announce';

const Search = (props: any) => {
  return <SearchPage {...props} />;
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { type, value, page } = context.query;

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      type,
      value,
      page,
    },
  };
};
