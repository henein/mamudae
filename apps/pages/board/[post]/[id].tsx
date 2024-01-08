import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../../../src/api/announce";
import DetailPage from "../../../src/containers/DetailPage/DetailPage";
import { detail } from "../../../src/api/detail";

const Detail = () => {
  return <DetailPage />;
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["detailPageData", id], () => detail(id));
  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
    },
  };
};
