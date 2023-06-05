import { useMutation } from "react-query";
import { createBoard } from "../../api/createBoard";

export interface ICreateBoard {
  accessToken?: string | undefined;
  boardType: string;
  text: string;
  title: string;
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
