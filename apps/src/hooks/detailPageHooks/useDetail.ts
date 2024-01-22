import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteBoard } from "../../api/board";
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

interface IDeleteBoard {
  boardType: string;
  boardId: number;
}
export const useBoardDelete = ({ boardType, boardId }: IDeleteBoard) => {
  const { mutate: boardDelete } = useMutation(
    ["board", boardType],
    () => deleteBoard(boardId),
    {
      onSuccess: () => {
        alert("게시물이 삭제되었습니다.");
        window.location.href = "/";
      },
    }
  );

  return { boardDelete };
};

export const useMine = (dataUid: string | null) => {
  const [isMyComment, setIsMyComment] = useState<boolean>(false);

  useEffect(() => {
    if (dataUid) {
      setIsMyComment(true);
    }
  }, [dataUid]);

  return isMyComment;
};
