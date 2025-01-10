import axios from 'axios';

export const getEachBoard = async (
  boardName: string,
  pageNum: number,
  size: number = 20
) => {
  const json = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/?type=${boardName}&page=${pageNum}&size=${size}`
  );
  const apiData = await json.data;
  return apiData;
};
