import axios from "axios";

export const getBoardList = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/type-list`
  );
  return res;
};

export const getBoard = async (boardName: string) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/?type=${boardName}&page=1`
  );
  const apiData = await json.data;
  return apiData;
};
