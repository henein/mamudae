import axios from "axios";

// F,H,B,I,E => (free,humor,boss,info,entire)
export const getBoard = async (boardName: string) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/?board=${boardName}&page=1&size=30`
  );
  const apiData = await json.data;
  return apiData;
};
