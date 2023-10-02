import { getApi, getEntireBoard } from "../../../src/api/mainpage";
import { useQueries } from "react-query";

// 전체,자유,유머,보스,직업
export const useGetAllPost = () => {
  return useQueries([
    {
      queryKey: "E",
      queryFn: () => getEntireBoard(),
      refetchOnWindowFocus: false,
    },
    {
      queryKey: "F",
      queryFn: () => getApi("F"),
      refetchOnWindowFocus: false,
    },
    {
      queryKey: "H",
      queryFn: () => getApi("H"),
      refetchOnWindowFocus: false,
    },
    {
      queryKey: "B",
      queryFn: () => getApi("B"),
      refetchOnWindowFocus: false,
    },
    {
      queryKey: "I",
      queryFn: () => getApi("I"),
      refetchOnWindowFocus: false,
    },
  ]);
};
