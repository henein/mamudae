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
  return useQuery("free", () => getApi("free"), {
    ...options,
  });
};

export const useGetHumorPost = (options = {}) => {
  return useQuery("humor", () => getApi("humor"), {
    ...options,
  });
};

export const useGetBossPost = (options = {}) => {
  return useQuery("boss", () => getApi("boss"), {
    ...options,
  });
};

export const useGetInfoPost = (options = {}) => {
  return useQuery("info", () => getApi("info"), {
    ...options,
  });
};

// 전체,자유,유머,보스,직업
export const useGetAllPost = () => {
  return useQueries([
    {
      queryKey: "advertise",
      queryFn: () => getApi("advertise"),
    },
    {
      queryKey: "free",
      queryFn: () => getApi("free"),
    },
    {
      queryKey: "humor",
      queryFn: () => getApi("humor"),
    },
    {
      queryKey: "boss",
      queryFn: () => getApi("boss"),
    },
    {
      queryKey: "info",
      queryFn: () => getApi("info"),
    },
  ]);
};
