import { getApi } from "../../../src/api/mainpage";
import { useQueries } from "react-query";

// 전체,자유,유머,보스,직업
export const useGetAllPost = () => {
  return useQueries([
    {
      queryKey: "A",
      queryFn: () => getApi("A"),
    },
    {
      queryKey: "F",
      queryFn: () => getApi("F"),
    },
    {
      queryKey: "H",
      queryFn: () => getApi("H"),
    },
    {
      queryKey: "B",
      queryFn: () => getApi("B"),
    },
    {
      queryKey: "I",
      queryFn: () => getApi("I"),
    },
  ]);
};
