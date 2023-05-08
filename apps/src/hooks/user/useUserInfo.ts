import { useMutation, useQuery } from "react-query";
import { userInfo, setUserName } from "../../api/userInfo";

interface IUseUserInfo {
  accessToken: string | undefined;
  options?: any;
}
interface IUseSetUserName {
  setName: string;
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

export const useSetUserName = ({
  setName,
  accessToken,
  options,
}: IUseSetUserName) => {
  const { mutate } = useMutation(
    "setUserName",
    () => setUserName(setName, accessToken),
    {
      ...options,
      enabled: !!accessToken,
    }
  );

  return { mutate };
};
