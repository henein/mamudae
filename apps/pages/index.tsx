import MainPage from "../src/container/MainPage/MainPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getApi } from "../src/hooks/queries/boardPost";

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("A", () => getApi("A"));
  await queryClient.prefetchQuery("F", () => getApi("F"));
  await queryClient.prefetchQuery("B", () => getApi("B"));
  await queryClient.prefetchQuery("H", () => getApi("H"));
  await queryClient.prefetchQuery("I", () => getApi("I"));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
