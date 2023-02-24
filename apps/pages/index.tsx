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
  await queryClient.prefetchQuery("advertise", () => getApi("advertise"));
  await queryClient.prefetchQuery("free", () => getApi("free"));
  await queryClient.prefetchQuery("boss", () => getApi("boss"));
  await queryClient.prefetchQuery("humor", () => getApi("humor"));
  await queryClient.prefetchQuery("info", () => getApi("info"));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
