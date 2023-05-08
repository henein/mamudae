import { useQuery, useMutation } from "react-query";
import { getComment } from "../../api/comment";

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

// export function useDeleteComment({ }) {
//   return useMutation(deleteComment, );
// }
