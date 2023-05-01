import axios from "axios";

interface IPostRecommend {
  id: string;
  accessToken: string | undefined;
}

// 헤더에 토큰 담아야 함
export const postRecommend = async ({ id, accessToken }: IPostRecommend) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${id}/recommend`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
};
