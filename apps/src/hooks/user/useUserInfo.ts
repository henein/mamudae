import { useMutation, useQuery, useQueryClient } from "react-query";
import { userInfo, setUserName } from "../../api/userInfo";
import handleTokenError from "../../utils/handleTokenError";

interface IUseUserInfo {
  accessToken: string | undefined;
  options?: any;
}

export const useUserInfo = ({ accessToken, options }: IUseUserInfo) => {
  const { data, refetch } = useQuery("userInfo", () => userInfo(accessToken), {
    ...options,
    enabled: !!accessToken,

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: any) => {
      handleTokenError(err, refetch);
    },
  });
  return { data };
};

interface IUseSetUserName {
  setName: string;
  accessToken: string | undefined;
  options?: any;
}

export const useSetUserName = ({
  setName,
  accessToken,
  options,
}: IUseSetUserName) => {
  const { mutate } = useMutation(() => setUserName(setName, accessToken), {
    ...options,
    enabled: !!accessToken,
  });

  return { mutate };
};
