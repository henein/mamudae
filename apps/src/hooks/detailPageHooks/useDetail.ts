import { useQuery } from "react-query";
import { detail } from "../../api/detail";

interface IUseDetail {
  boardId: string;
  options?: any;
}

export function useDetail({ boardId, options }: IUseDetail) {
  const { data, refetch } = useQuery(
    ["detailPageData", boardId],
    () => detail(boardId),
    {
      ...options,
    }
  );

  console.log(data);
  return { ...data, refetch };
}
