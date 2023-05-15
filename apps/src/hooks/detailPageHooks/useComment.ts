import { useQuery, useMutation } from "react-query";
import { getComment, postComment } from "../../api/comment";

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
  id: string;
  comment: string;
  // commentId: string;
  userId: string;
  options?: any;
  accessToken?: string | undefined;
}

export function usePostComment({
  id,
  comment,
  // commentId,
  userId,
}: IPostUseComment) {
  return useMutation("postComment", () =>
    postComment({
      id,
      comment,
      // commentId,
      userId,
    })
  );
}
