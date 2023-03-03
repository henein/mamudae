import { useQuery } from "react-query";
import { announce } from "../../../src/api/announce";

export function useGetAnnounce(options = {}) {
  return useQuery("announce", () => announce(), {
    ...options,
  });
}
