import axios from "axios";

// free,humor,boss,info
export const getApi = async (boardName: string) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${boardName}`
  );
  const apiData = await json.data;
  return apiData;
};

export const getEntireBoard = async () => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/entireboard`
  );
  const apiData = await json.data;
  return apiData;
};
