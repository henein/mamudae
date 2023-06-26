import axios from "axios";

interface DefaultProps {
  accessToken?: string | undefined;
}
export interface GetComment extends DefaultProps {
  boardId: string;
}
export interface PComment extends DefaultProps {
  boardId: string;
  comment: string;
  commentId?: string | null;
}
export interface RComment extends PComment {
  replyId: string;
  tag?: string;
}

// 댓글 조회
export const getComment = async ({ boardId }: GetComment) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${boardId}/comment`
  );

  console.log(res);
  return res;
};

// 부모댓글 작성
export const postComment = async ({ ...props }: PComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: props.boardId,
      comment: props.comment,
      commentId: null,
    },
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    }
  );
  return res.data;
};

// 대댓글 작성 => 부모댓글의 commentId, 부모댓글userName or 자식댓글useName or null의 tag가 필요함
export const postReComment = async ({ ...props }: RComment) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment/child`,
    {
      boardId: props.boardId,
      comment: props.comment,
      commentId: props.commentId,
      replyId: props.replyId,
      tag: props.tag,
    },
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    }
  );

  return res.data;
};

// 부모 댓글 수정
export const putComment = async ({ ...props }: PComment) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      boardId: props.boardId,
      comment: props.comment,
      commentId: props.commentId,
    },
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    }
  );
};
// 대댓글 수정
export const putReComment = async ({ ...props }: RComment) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment/child`,
    {
      boardId: props.boardId,
      comment: props.comment,
      commentId: props.commentId,
      replyId: props.replyId,
      tag: props.tag,
    },
    {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    }
  );
};

// 댓글 삭제
export const deleteComment = async ({ ...props }: PComment) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      data: {
        boardId: props.boardId,
        comment: props.comment,
        commentId: props.commentId,
      },
    }
  );

  return res.data;
};

// 대댓글 삭제
export const deleteReComment = async ({ ...props }: RComment) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/board/comment`,
    {
      data: {
        boardId: props.boardId,
        comment: props.comment,
        commentId: props.commentId,
        replyId: props.replyId,
        tag: props.tag,
      },
    }
  );

  return res.data;
};
