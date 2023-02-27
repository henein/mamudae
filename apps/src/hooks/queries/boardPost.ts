import axios from "axios";
import { useQueries, useQuery } from "react-query";

// free,humor,boss,info
export const getApi = async (boardName: string) => {
  const json = await axios.get(
    `http://henesysback.shop:8081/board/${boardName}`
  );
  const apiData = await json.data;
  return apiData;
};

export const useGetFreePost = (options = {}) => {
  return useQuery("F", () => getApi("F"), {
    ...options,
  });
};

export const useGetHumorPost = (options = {}) => {
  return useQuery("H", () => getApi("H"), {
    ...options,
  });
};

export const useGetBossPost = (options = {}) => {
  return useQuery("B", () => getApi("B"), {
    ...options,
  });
};

export const useGetInfoPost = (options = {}) => {
  return useQuery("I", () => getApi("I"), {
    ...options,
  });
};

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
