import axios from "axios";

// free,humor,boss,info
export const getApi = async (boardName: string) => {
  const json = await axios.get(`https://henesysback.shop/board/${boardName}`);
  const apiData = await json.data;
  return apiData;
};

export const getEntireBoard = async () => {
  const json = await axios.get(`https://henesysback.shop/board/entireboard`);
  const apiData = await json.data;
  return apiData;
};
