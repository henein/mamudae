import { useQuery } from "react-query";
import { getMyBoard, getMyCommentBoard } from "../../api/userInfo";

export function useGetMyBoard(options = {}, accessToken: any) {
  return useQuery("myBoards", () => getMyBoard(accessToken), {
    ...options,
  });
}

export function useGetMyCommentBoard(options = {}, accessToken: any) {
  return useQuery("myCommentBoards", () => getMyCommentBoard(accessToken), {
    ...options,
  });
}
