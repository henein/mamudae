import { getBoard } from "../../../src/api/mainpage";
import { useQueries, useQuery } from "react-query";

export const useGetBoard = (boardType: string) => {
  const { data } = useQuery(["board", boardType], () => getBoard(boardType), {
    refetchOnWindowFocus: false,
  });
  return { data };
};
