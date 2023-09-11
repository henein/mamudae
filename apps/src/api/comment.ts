import axios from "axios";
import axiosInstance from "./axiosInstance";

interface DefaultProps {
  accessToken?: string | undefined;
}
export interface GetComment extends DefaultProps {
  boardId: string;
}
export interface PComment extends DefaultProps {
  boardId: string;
  comment?: string;
  commentId?: string | null;
}
export interface RComment extends PComment {
  replyId?: string;
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
  const res = await axiosInstance.post(`/board/${props.boardId}/comment`, {
    comment: props.comment,
  });
  return res.data;
};

// 대댓글 작성
export const postReComment = async ({ ...props }: RComment) => {
  const res = await axiosInstance.post(
    `/board/${props.boardId}/comment/${props.commentId}/child`,
    {
      comment: props.comment,
      tag: props.tag,
    }
  );

  return res.data;
};

// 부모 댓글 수정
export const putComment = async ({ ...props }: PComment) => {
  const res = await axiosInstance.put(
    `/board/${props.boardId}/comment/${props.commentId}`,
    {
      comment: props.comment,
    }
  );
};
// 대댓글 수정
export const putReComment = async ({ ...props }: RComment) => {
  const res = await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/board/${props.boardId}/comment/child/${props.replyId}`,
    {
      comment: props.comment,
      tag: props.tag,
    }
  );
};

// 댓글 삭제
export const deleteComment = async ({ ...props }: PComment) => {
  const res = await axiosInstance.delete(
    `/board/${props.boardId}/comment/${props.commentId}`
  );

  return res.data;
};

// 대댓글 삭제
export const deleteReComment = async ({ ...props }: RComment) => {
  const res = await axiosInstance.delete(
    `/board/${props.boardId}/comment/child/${props.replyId}`
  );

  return res.data;
};
