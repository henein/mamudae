import { getBoard, getBoardList, getMainBoardList } from '../../api/mainpage';
import { useQuery } from 'react-query';
import { getEachBoard } from '../../api/postpage';

export const useGetBoard = (boardType: string) => {
  const { data } = useQuery(['board', boardType], () => getBoard(boardType), {
    refetchOnWindowFocus: false,
  });
  return { data };
};

export const useGetEachBoard = (boardType: string, pageNum: number) => {
  const { data } = useQuery(
    [boardType, pageNum],
    () => getEachBoard(boardType, pageNum),
    {
      refetchOnWindowFocus: false,
    }
  );
  return { data };
};

export const useGetBoardList = () => {
  const { data } = useQuery(['boardList'], () => getBoardList(), {
    refetchOnWindowFocus: false,
  });
  return { data };
};

export const useGetMainBoardList = () => {
  const { data } = useQuery(['mainBoardList'], () => getMainBoardList(), {
    refetchOnWindowFocus: false,
  });
  return { data };
};
