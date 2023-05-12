import axios from "axios";
// 헤더에 토큰 담아야 함

interface IComment {
  id: string;
  accessToken?: string | undefined;
}

export const getComment = async ({ id }: IComment) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${id}/comment`
  );

  return res;
};

export const postComment = async (id: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`
  );

  return res.data;
};

export const putComment = async (id: string) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: 0,
      comment: "string",
      commentId: 0,
      userId: "string",
    }
  );

  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      data: {
        boardId: 0,
        comment: "string",
        commentId: 0,
        userId: "string",
      },
    }
  );

  return res.data;
};
