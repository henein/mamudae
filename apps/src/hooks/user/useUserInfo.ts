import { useQuery } from "react-query";
import { userInfo } from "../../api/userInfo";

interface IUseUserInfo {
  accessToken: string | undefined;
  options?: any;
}

export const useUserInfo = ({ accessToken, options }: IUseUserInfo) => {
  const { data } = useQuery("userInfo", () => userInfo(accessToken), {
    ...options,
    enabled: !!accessToken,
  });

  console.log(data);
  return { data };
};
