import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComment, postComment, postReComment } from "../../api/comment";

interface IUseComment {
  id: string;
  options?: any;
  accessToken?: string | undefined;
}

export function useGetComment({ id, options }: IUseComment) {
  const { data } = useQuery(["comment", id], () => getComment({ id }), {
    ...options,
  });

  return { ...data };
}

interface IPostUseComment {
  boardId: string;
  comment: string;
  commentId?: string;
  tag: string;
  options?: any;
  accessToken?: string | undefined;
}

export function usePostComment({
  boardId,
  comment,
  commentId,
  tag,
}: IPostUseComment) {
  const queryClient = useQueryClient();
  return useMutation(
    "postComment",
    () =>
      postComment({
        boardId,
        comment,
        commentId,
        tag,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 postComment 갱신
      },
    }
  );
}

export function usePostReComment({
  boardId,
  comment,
  commentId,
  tag,
}: IPostUseComment) {
  const queryClient = useQueryClient();
  return useMutation(
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
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 postComment 갱신
      },
    }
  );
}

// export function usePutComment({
//   boardId,
//   comment,
//   // commentId,
//   tag,
// }: IPostUseComment) {
//   return useMutation("postComment", () =>
//     postComment({
//       boardId,
//       comment,
//       // commentId,
//       tag,
//     })
//   );
// }

// export function useDeleteComment({
//   boardId,
//   comment,
//   // commentId,
//   tag,
// }: IPostUseComment) {
//   return useMutation("postComment", () =>
//     postComment({
//       boardId,
//       comment,
//       // commentId,
//       tag,
//     })
//   );
// }
