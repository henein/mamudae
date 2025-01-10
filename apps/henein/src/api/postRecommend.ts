import axiosInstance from './axiosInstance';
interface IPostRecommend {
  boardId: number;
}

// 헤더에 토큰 담아야 함
export const postRecommend = async ({ boardId }: IPostRecommend) => {
  const res = await axiosInstance.post('/board/recommend', {
    id: boardId,
  });
  return res;
};
