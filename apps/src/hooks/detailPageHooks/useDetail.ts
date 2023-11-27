import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { detail } from "../../api/detail";

interface IUseDetail {
  boardId: string;
  accessToken?: string;
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

  return { data, refetch };
}

export const useMine = (dataUid: string | null) => {
  const [isMyComment, setIsMyComment] = useState<boolean>(false);

  useEffect(() => {
    if (dataUid) {
      setIsMyComment(true);
    }
  }, [dataUid]);

  return isMyComment;
};
