import { useQuery } from "react-query";
import { detail } from "../../api/detail";

interface IUseDetail {
  boardId: string;
  accessToken?: string;
  options?: any;
}

export function useDetail({ boardId, accessToken, options }: IUseDetail) {
  const { data, refetch } = useQuery(
    ["detailPageData", boardId],
    () => detail(boardId, accessToken),
    {
      ...options,
    }
  );

  console.log(data);
  return { ...data, refetch };
}
