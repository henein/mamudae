import { useMutation } from "react-query";
import { ICreateBoard, createBoard } from "../../api/board";

export const useCreateBoard = (options?: object) => {
  const { mutate } = useMutation(
    ({ ...props }: ICreateBoard) => createBoard({ ...props }),
    {
      ...options,
    }
  );

  return { mutate };
};
