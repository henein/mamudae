import axios from "axios";

// F,H,B,I,E
export const getApi = async (boardName: string, pageNum: number) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/?board=${boardName}&page=${pageNum}`
  );
  const apiData = await json.data;
  return apiData;
};
