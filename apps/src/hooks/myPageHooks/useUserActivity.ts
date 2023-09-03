import { useQuery } from "react-query";
import { getMyBoard, getMyCommentBoard } from "../../api/userInfo";

interface getMyPage {
  options?: any;
}

export function useGetMyBoard({ options }: getMyPage) {
  const { data } = useQuery("myBoards", () => getMyBoard(), {
    ...options,
  });
  return { ...data };
}

export function useGetMyCommentBoard({ options }: getMyPage) {
  const { data } = useQuery("myCommentBoards", () => getMyCommentBoard(), {
    ...options,
  });
  return { ...data };
}
