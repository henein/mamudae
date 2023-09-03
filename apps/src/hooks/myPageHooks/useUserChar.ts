import { useQuery } from "react-query";
import { getAllMyChar } from "../../api/userInfo";

export function useGetAllMyChar(options = {}, accessToken: any) {
  return useQuery("allMyChar", () => getAllMyChar(accessToken), {
    ...options,
  });
}
