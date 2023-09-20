import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import UpdatePage from "../../src/containers/UpdatePage/UpdatePage";
import { detail } from "../../src/api/detail";

const update = () => {
  return <UpdatePage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["detailPageData", id], () => detail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 초기 데이터 캐싱 dehydrate
    },
  };
};

export default update;
