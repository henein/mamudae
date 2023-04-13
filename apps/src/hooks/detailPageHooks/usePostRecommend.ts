import { useMutation, useQueryClient } from "react-query";
import { postRecommend } from "../../api/postRecommend";

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
  const { mutate } = useMutation(
    ["getRecommend"],
    () => postRecommend({ id, accessToken }),
    {
      ...options,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["detailPageData", id]); // onSuccess 시에 useDetail 쿼리 갱신
      },
      onError: (err) => console.log(err),
    }
  );

  const recommend = () => {
    if (accessToken) {
      mutate();
    } else {
      console.log("아직 accessToken을 가져오지 못함");
    }
  };

  return { recommend };
};
