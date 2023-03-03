import MainPage from "../src/components/MainPage/MainPage";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getApi, getEntireBoard } from "../src/api/mainpage";
import { announce } from "../src/api/announce";

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("entire", () => getEntireBoard());
  await queryClient.prefetchQuery("F", () => getApi("F"));
  await queryClient.prefetchQuery("B", () => getApi("B"));
  await queryClient.prefetchQuery("H", () => getApi("H"));
  await queryClient.prefetchQuery("I", () => getApi("I"));
  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
