import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getApi } from "../../api/postpage";

const title: { [key: string]: string } = {
  전체: "E",
  자유: "F",
  유머: "H",
  보스: "B",
  직업: "I",
};

export function useEachPost() {
  const router = useRouter();
  const pageNum = parseInt(router.query.page as string) || 1;
  const boardTitle = router.query.post as string;
  const boardKey = title[boardTitle];

  return useQuery([boardKey, pageNum], () => getApi(boardKey, pageNum), {
    refetchOnWindowFocus: false,
  });
}
