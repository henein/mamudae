import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getApi } from "../../api/postpage";

export function useEachPost(boardType: string) {
  const router = useRouter();
  const pageNum = parseInt(router.query.page as string) || 1;

  return useQuery([boardType, pageNum], () => getApi(boardType, pageNum), {
    refetchOnWindowFocus: false,
  });
}
