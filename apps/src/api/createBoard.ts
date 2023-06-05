import axios from 'axios';
import { ICreateBoard } from '../hooks/writingPageHooks/useCreateBoard';

export async function createBoard({ accessToken, ...props }: ICreateBoard) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/board`,
    {
      ...props,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
}
