import { useQuery, useMutation, useQueryClient } from "react-query";
import { getComment, postComment, postReComment } from "../../api/comment";
import handleTokenError from "../../utils/handleTokenError";

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
  tag?: string;
  options?: any;
  accessToken: string | undefined;
}

export function usePostComment({
  boardId,
  comment,
  commentId,
  tag,
  accessToken,
}: IPostUseComment) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "postComment",
    () =>
      postComment({
        boardId,
        comment,
        commentId,
        tag,
        accessToken,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", boardId]); // onSuccess 시에 comment 갱신
      },
      onError: (err: any) => {
        handleTokenError(err)
          .then(() => {
            mutate();
          })
          .catch((error: any) => {
            console.error("Error handling failed");
          });
      },
    }
  );

  const postComments = () => {
    if (accessToken) {
      mutate();
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { postComments };
}

export function usePostReComment({
  boardId,
  comment,
  commentId,
  tag,
  accessToken,
}: IPostUseComment) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
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
      },
      // onError: (err: any) => {
      //   handleTokenError(err)
      //     .then(() => {
      //       mutate();
      //     })
      //     .catch((error: any) => {
      //       console.error("Error handling failed");
      //     });
      // },
    }
  );

  const postReComments = () => {
    if (accessToken) {
      mutate();
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { postReComments };
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
