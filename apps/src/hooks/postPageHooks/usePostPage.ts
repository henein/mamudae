import { useQuery } from "react-query";
import { getEntireBoard, getApi } from "../../api/mainpage";

type UseGetPostType = {
  boardType: string;
  options?: any;
};

export function useGetPost({ boardType, options }: UseGetPostType) {
  return useQuery(
    boardType,
    boardType == "entire" ? () => getEntireBoard() : () => getApi(boardType),
    {
      ...options,
    }
  );
}
