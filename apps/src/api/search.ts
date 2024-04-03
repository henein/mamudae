import axios from "axios";

export interface SearchListParams {
  type: string;
  value: string;
  page: number;
}
export const getSearchList = async ({
  type,
  value,
  page,
}: SearchListParams) => {
  const res = await axios.get(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/board/search?type=${type}&key=${value}&page=${page || 1}`
  );

  return res.data;
};
