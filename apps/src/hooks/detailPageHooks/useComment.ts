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
export function usePostComment({
  boardId,
  comment,
  commentId,
  accessToken,
}: usePComment) {
  const queryClient = useQueryClient();
  const postCommentMutation = useMutation(
    "postComment",
    () =>
      postComment({
        boardId,
        comment,
        commentId,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
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
  replyId,
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
        replyId,
        tag,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
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

// export function usePutComment({
//   boardId,
//   comment,
//   commentId,
//   accessToken,
// }: IPutUseComment) {
//   const queryClient = useQueryClient();
//   const { mutate } = useMutation(
//     "putComment",
//     () =>
//       putComment({
//         boardId,
//         comment,
//         commentId,
//       }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
//       },
//     }
//   );

//   const putComments = () => {
//     if (accessToken) {
//       mutate();
//     } else {
//       console.log("아직 accessToken을 가져오지 못함");
//     }
//   };

//   return { putComments };
// }

// export function usePutReComment({
//   boardId,
//   comment,
//   commentId,
//   tag,
//   accessToken,
// }: IPutUseComment) {
//   const queryClient = useQueryClient();
//   const { mutate } = useMutation(
//     "putReComment",
//     () =>
//       putReComment({
//         boardId,
//         comment,
//         commentId,
//         tag,
//       }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
//       },
//     }
//   );

//   const putReComments = () => {
//     if (accessToken) {
//       mutate();
//     } else {
//       console.log("아직 accessToken을 가져오지 못함");
//     }
//   };

//   return { putReComments };
// }

export function useDelComment({
  boardId,
  comment,
  commentId,
  accessToken,
}: usePComment) {
  const queryClient = useQueryClient();
  const delCommentMutation = useMutation(
    "delComment",
    () =>
      deleteComment({
        boardId,
        comment,
        commentId,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
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
  comment,
  commentId,
  replyId,
  tag,
  accessToken,
}: useRComment) {
  const queryClient = useQueryClient();
  const delReCommentMutation = useMutation(
    "delReComment",
    () =>
      deleteReComment({
        boardId,
        comment,
        commentId,
        replyId,
        tag,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
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
