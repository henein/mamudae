import { useMutation, useQueryClient } from "react-query";
import { postRecommend } from "../../api/postRecommend";
import handleTokenError from "../../utils/handleTokenError";

interface IPostRecommend {
  id: string;
  accessToken: string | undefined;
  options?: any;
}

export const usePostRecommend = ({
  id,
  accessToken,
  options,
}: IPostRecommend) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation(
    ["postRecommend", id],
    () => postRecommend({ id, accessToken }),
    {
      ...options,
      enabled: !!accessToken,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["detailPageData", id]); // onSuccess 시에 useDetail 쿼리 무효화
        queryClient.refetchQueries(["detailPageData", id]); // refetch
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
