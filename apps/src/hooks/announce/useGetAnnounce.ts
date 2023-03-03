import { useQuery } from "react-query";
import { announce } from "../../api/announce";

export function useGetAnnounce(options = {}) {
  return useQuery("announce", () => announce(), {
    ...options,
  });
}
