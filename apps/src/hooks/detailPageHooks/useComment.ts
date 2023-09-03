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
export function usePostComment({ boardId, comment, accessToken }: usePComment) {
  const queryClient = useQueryClient();
  const postCommentMutation = useMutation(
    "postComment",
    () =>
      postComment({
        boardId,
        comment,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const postComments = async () => {
    if (accessToken) {
      try {
        await postCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await postCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
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
  accessToken,
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
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const postReComments = async () => {
    if (accessToken) {
      try {
        await postReCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await postReCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { postReComments };
}

export function usePutComment({
  boardId,
  comment,
  commentId,
  accessToken,
}: usePComment) {
  const queryClient = useQueryClient();
  const putCommentMutation = useMutation(
    "putComment",
    () =>
      putComment({
        boardId,
        comment,
        commentId,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const putComments = async () => {
    if (accessToken) {
      try {
        await putCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await putCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { putComments };
}

export function usePutReComment({
  boardId,
  replyId,
  comment,
  tag,
  accessToken,
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
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신 -> 총 댓글 수 가지고오기 위함
      },
    }
  );

  const putReComments = async () => {
    if (accessToken) {
      try {
        await putReCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await putReCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { putReComments };
}

export function useDelComment({
  boardId,
  commentId,
  accessToken,
}: usePComment) {
  const queryClient = useQueryClient();
  const delCommentMutation = useMutation(
    "delComment",
    () =>
      deleteComment({
        boardId,
        commentId,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const delComments = async () => {
    if (accessToken) {
      try {
        await delCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await delCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { delComments };
}

export function useDelReComment({
  boardId,
  replyId,
  accessToken,
}: useRComment) {
  const queryClient = useQueryClient();
  const delReCommentMutation = useMutation(
    "delReComment",
    () =>
      deleteReComment({
        boardId,
        replyId,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 detailPageData 갱신
      },
    }
  );

  const delReComments = async () => {
    if (accessToken) {
      try {
        await delReCommentMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await delReCommentMutation.mutateAsync();
      }
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { delReComments };
}
