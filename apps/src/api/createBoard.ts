import axios from "axios";
import { ICreateBoard } from "../hooks/writingPageHooks/useCreateBoard";

export async function createBoard({ ...props }: ICreateBoard) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/board`, {
    ...props,
  });
  return res.data;
}
