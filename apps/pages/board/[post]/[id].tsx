import axios from "axios";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import DetailPage from "../../../src/containers/DetailPage/DetailPage";

const Detail = () => {
  return <DetailPage />;
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["detailPageData", `${id}`], async () => {
    const json = await axios.get(`http://henesysback.shop:8081/board/F/2`);
    const data = json.data;
    console.log(data);
    return data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
    },
  };
};
