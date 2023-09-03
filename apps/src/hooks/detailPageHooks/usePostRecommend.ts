import { useMutation, useQueryClient } from "react-query";
import { postRecommend } from "../../api/postRecommend";

interface IPostRecommend {
  boardId: string;
  options?: any;
}

export const usePostRecommend = ({ boardId, options }: IPostRecommend) => {
  const queryClient = useQueryClient();

  const recommendMutation = useMutation(
    ["postRecommend", boardId],
    () => postRecommend({ boardId }),
    {
      ...options,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["detailPageData", boardId]); // onSuccess 시에 useDetail 쿼리 무효화
        queryClient.refetchQueries(["detailPageData", boardId]); // refetch
      },
    }
  );

  const recommend = async () => {
    if (localStorage.getItem("access")) {
      try {
        await recommendMutation.mutateAsync();
      } catch (err: any) {
        await recommendMutation.mutateAsync();
      }
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return { recommend };
};
