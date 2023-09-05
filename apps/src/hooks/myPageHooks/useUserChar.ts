import { useQuery, useMutation } from "react-query";
import { getAllMyChar } from "../../api/userInfo";
import { getUserCharName } from "../../api/userInfo";

interface IGetCharName {
  key: string;
  options?: any;
}
export const useGetCharName = ({ key, options }: IGetCharName) => {
  const { mutate } = useMutation(() => getUserCharName(key), {
    ...options,
  });

  return { mutate };
};

export const useGetAllMyChar = (options = {}) => {
  return useQuery("allMyChar", () => getAllMyChar(), {
    ...options,
  });
};
