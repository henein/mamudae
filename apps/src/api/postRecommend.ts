import axios from "axios";

interface IPostRecommend {
  boardId: string;
  accessToken: string | undefined;
}

// 헤더에 토큰 담아야 함
export const postRecommend = async ({
  boardId,
  accessToken,
}: IPostRecommend) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/recommend`,
    {
      id: boardId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};
