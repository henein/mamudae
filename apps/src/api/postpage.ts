import axios from "axios";

// F,H,B,I,entireboard
export const getApi = async (boardName: string, pageNum: number) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${boardName}/?page=${pageNum}`
  );
  const apiData = await json.data;
  return apiData;
};
