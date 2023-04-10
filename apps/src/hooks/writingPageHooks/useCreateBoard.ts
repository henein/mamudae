import { useMutation } from "react-query";
import { createBoard } from "../../api/createBoard";

export interface ICreateBoard {
  boardType: string;
  text: string;
  title: string;
  name: string;
}

export const useCreateBoard = (options?: object) => {
  const { mutate } = useMutation(
    ({ ...props }: ICreateBoard) => createBoard({ ...props }),
    {
      ...options,
    }
  );

  return { mutate };
};
