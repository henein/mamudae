import { useMutation, useQueryClient } from "react-query";
import { postRecommend } from "../../api/postRecommend";
import handleTokenError from "../../utils/handleTokenError";

interface IPostRecommend {
  boardId: string;
  accessToken: string | undefined;
  options?: any;
}

export const usePostRecommend = ({
  boardId,
  accessToken,
  options,
}: IPostRecommend) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(
    ["postRecommend", boardId],
    () => postRecommend({ boardId, accessToken }),
    {
      ...options,
      enabled: !!accessToken,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 useDetail 쿼리 무효화
        queryClient.refetchQueries(["detailPageData", boardId]); // refetch
      },
      onError: (err: any) => {
        handleTokenError(err)
          .then(() => {
            mutate();
          })
          .catch((error) => {
            console.error("Error handling failed");
          });
      },
    }
  );

  const recommend = () => {
    if (accessToken) {
      mutate();
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { recommend, error };
};
