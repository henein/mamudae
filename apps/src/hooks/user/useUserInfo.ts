import { useQuery } from "react-query";
import { userInfo } from "../../api/userInfo";
import { useLocalStorage } from "../storage/useLocalStorage";

interface IUseUserInfo {
  options?: any;
  accessToken?: string;
}

export const useUserInfo = ({ options }: IUseUserInfo) => {
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");
  const { data } = useQuery("userInfo", () => userInfo(accessToken), {
    ...options,
  });
  return { data };
};
