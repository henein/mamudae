import { getBoard, getBoardList } from "../../../src/api/mainpage";
import { useQueries, useQuery } from "react-query";

export const useGetBoard = (boardType: string) => {
  const { data } = useQuery(["board", boardType], () => getBoard(boardType), {
    refetchOnWindowFocus: false,
  });
  return { data };
};

export const useGetBoardList = () => {
  const { data } = useQuery(["boardList"], () => getBoardList(), {
    refetchOnWindowFocus: false,
  });
  return { data };
};
