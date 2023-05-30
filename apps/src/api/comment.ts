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

// 부모댓글 작성 -> commentId, tag가 필요없음
interface IPostComment {
  boardId: string;
  comment: string;
  commentId?: string | null;
  tag?: string;
  accessToken?: string | undefined;
}
export const postComment = async ({
  boardId,
  comment,
  accessToken,
}: IPostComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: boardId,
      comment: comment,
      commentId: null,
      tag: null,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// 대댓글 작성 => 부모댓글의 commentId, 부모댓글userName or 자식댓글useName or null의 tag가 필요함
export const postReComment = async ({
  boardId,
  comment,
  commentId,
  tag,
  accessToken,
}: IPostComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment/child`,
    {
      boardId: boardId,
      comment: comment,
      commentId: commentId,
      tag: tag,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
