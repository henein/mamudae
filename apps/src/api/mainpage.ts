import axios from "axios";

// free,humor,boss,info
export const getApi = async (boardName: string) => {
  const json = await axios.get(
    `http://henesysback.shop:8081/board/${boardName}`
  );
  const apiData = await json.data;
  return apiData;
};
