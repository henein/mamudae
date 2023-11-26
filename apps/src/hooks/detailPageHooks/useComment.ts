import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getComment,
  postComment,
  postReComment,
  putComment,
  putReComment,
  deleteComment,
  deleteReComment,
} from "../../api/comment";
import handleTokenError from "../../utils/handleTokenError";
import { GetComment, PComment, RComment } from "../../api/comment";

interface useGetComment extends GetComment {
  options?: any;
}
// 부모댓글 타입
interface usePComment extends PComment {
  options?: any;
}
// 대댓글 타입
interface useRComment extends RComment {
  options?: any;
}

// 댓글 조회
export function useGetComment({ boardId, options }: useGetComment) {
  const { data } = useQuery(
    ["comment", boardId],
    () => getComment({ boardId }),
    {
      ...options,
    }
  );

  return { ...data };
}

// 부모 댓글 작성
export function usePostComment({ boardId, comment }: usePComment) {
  const queryClient = useQueryClient();
  const postCommentMutation = useMutation(
    "postComment",
    () =>
      postComment({
        boardId,
        comment,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const postComments = async () => {
    try {
      await postCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await postCommentMutation.mutateAsync();
    }
  };

  return { postComments };
}
// 대댓글 작성
export function usePostReComment({
  boardId,
  comment,
  commentId,
  tag,
}: useRComment) {
  const queryClient = useQueryClient();
  const postReCommentMutation = useMutation(
    "postReComment",
    () =>
      postReComment({
        boardId,
        comment,
        commentId,
        tag,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const postReComments = async () => {
    try {
      await postReCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await postReCommentMutation.mutateAsync();
    }
  };

  return { postReComments };
}

export function usePutComment({ boardId, comment, commentId }: usePComment) {
  const queryClient = useQueryClient();
  const putCommentMutation = useMutation(
    "putComment",
    () =>
      putComment({
        boardId,
        comment,
        commentId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const putComments = async () => {
    try {
      await putCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await putCommentMutation.mutateAsync();
    }
  };

  return { putComments };
}

export function usePutReComment({
  boardId,
  replyId,
  comment,
  tag,
}: useRComment) {
  const queryClient = useQueryClient();
  const putReCommentMutation = useMutation(
    "putReComment",
    () =>
      putReComment({
        boardId,
        replyId,
        comment,
        tag,
      }),
    {
      onSuccess: () => {
        console.log(tag);
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const putReComments = async () => {
    try {
      await putReCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await putReCommentMutation.mutateAsync();
    }
  };

  return { putReComments };
}

export function useDelComment({ boardId, commentId }: usePComment) {
  const queryClient = useQueryClient();
  const delCommentMutation = useMutation(
    "delComment",
    () =>
      deleteComment({
        boardId,
        commentId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const delComments = async () => {
    try {
      await delCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await delCommentMutation.mutateAsync();
    }
  };

  return { delComments };
}

export function useDelReComment({ boardId, replyId }: useRComment) {
  const queryClient = useQueryClient();
  const delReCommentMutation = useMutation(
    "delReComment",
    () =>
      deleteReComment({
        boardId,
        replyId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const delReComments = async () => {
    try {
      await delReCommentMutation.mutateAsync();
    } catch (err: any) {
      await handleTokenError(err);
      await delReCommentMutation.mutateAsync();
    }
  };

  return { delReComments };
}
