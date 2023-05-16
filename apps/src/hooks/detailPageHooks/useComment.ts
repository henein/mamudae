import { useQuery, useMutation } from "react-query";
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
  return useMutation("postComment", () =>
    postComment({
      boardId,
      comment,
      commentId,
      tag,
    })
  );
}

export function usePostReComment({
  boardId,
  comment,
  commentId,
  tag,
}: IPostUseComment) {
  return useMutation("postComment", () =>
    postReComment({
      boardId,
      comment,
      commentId,
      tag,
    })
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
