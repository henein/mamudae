import { useMutation, useQuery } from "react-query";
import { getProfile, setUserProfile } from "../../api/userInfo";

export const useGetMyProfile = ({ options }: any) => {
  const { data } = useQuery("myProfile", () => getProfile(), {
    ...options,
  });
  return { ...data };
};

interface ISetUserInfo {
  forms: {
    image: File | null;
    userName: string | null;
  };
  options?: any;
}

export const useSetUserInfo = ({ forms, options }: ISetUserInfo) => {
  const { mutate } = useMutation(() => setUserProfile({ forms }), {
    ...options,
    onError: (err: any) => {
      alert(err.response.data.errorMessage);
    },
  });

  return { mutate };
};
