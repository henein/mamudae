import { useQuery } from "react-query";
import { announce } from "../../api/announce";
// import { getEntireBoard } from "../../../src/api/mainpage";

export function useGetAnnounce(options = {}) {
  return useQuery("announce", () => announce(), {
    ...options,
  });
}
