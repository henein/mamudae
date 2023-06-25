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

  const recommendMutation = useMutation(
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
    }
  );

  const recommend = async () => {
    if (accessToken) {
      try {
        await recommendMutation.mutateAsync();
      } catch (err: any) {
        await handleTokenError(err);
        await recommendMutation.mutateAsync();
      }
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return { recommend };
};
