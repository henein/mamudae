import { useQuery } from 'react-query';
import { getMyBoard, getMyCommentBoard } from '../../api/userInfo';

interface getMyPage {
  nickname: string;
  page: number;
  options?: any;
}

export function useGetMyBoard({ nickname, page, options }: getMyPage) {
  const { data, refetch } = useQuery(
    ['myBoards', nickname],
    () => getMyBoard(nickname, page),
    {
      ...options,
    }
  );
  return { data, refetch };
}

export function useGetMyCommentBoard({ nickname, page, options }: getMyPage) {
  const { data, refetch } = useQuery(
    ['myCommentBoards', nickname],
    () => getMyCommentBoard(nickname, page),
    {
      ...options,
    }
  );
  return { data, refetch };
}
