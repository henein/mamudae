import axios from "axios";
// 헤더에 토큰 담아야 함

// 댓글 조회
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

// 댓글 작성
interface IPostComment {
  boardId: string;
  comment: string;
  commentId?: null;
  tag: string;
  accessToken?: string | undefined;
}
export const postComment = async ({ boardId, comment, tag }: IPostComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: boardId,
      comment: comment,
      commentId: null,
      tag: tag,
    }
  );

  return res.data;
};

// 대댓글 작성 => commentId 작성 해야함
export const postReComment = async ({
  boardId,
  comment,
  commentId,
  tag,
}: IPostComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: boardId,
      comment: comment,
      commentId: commentId,
      tag: tag,
    }
  );

  return res.data;
};

// 댓글 수정
export const putComment = async ({
  boardId,
  comment,
  commentId,
  tag,
}: IPostComment) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: boardId,
      comment: comment,
      commentId: commentId,
      tag: tag,
    }
  );

  return res.data;
};

// 댓글 삭제
// comment,tag 는 null 로 보내기
export const deleteComment = async ({
  boardId,
  comment,
  commentId,
  tag,
}: IPostComment) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      data: {
        boardId: boardId,
        comment: comment,
        commentId: commentId,
        tag: tag,
      },
    }
  );

  return res.data;
};
