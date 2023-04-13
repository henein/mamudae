import axios from "axios";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { announce } from "../../../src/api/announce";
import DetailPage from "../../../src/containers/DetailPage/DetailPage";

const Detail = () => {
  return <DetailPage />;
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["detailPageData", `${id}`], async () => {
    const json = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${id}`
    );
    const data = json.data;
    console.log(data);
    return data;
  });
  await queryClient.prefetchQuery("announce", () => announce());

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
    },
  };
};
