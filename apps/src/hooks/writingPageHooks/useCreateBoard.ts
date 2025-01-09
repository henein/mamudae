import { useMutation } from "react-query";
import { ICreateBoard, IUpdateBoard, createBoard, updateBoard } from "../../api/board";

export const useCreateBoard = (options?: object) => {
  const { mutate } = useMutation(
    ({ ...props }: ICreateBoard) => createBoard({ ...props }),
    {
      ...options,
    }
  );

  return { mutate };
};

export const useUpdateBoard = (options?: object) => {
  const { mutate } = useMutation(
    ({ ...props }: IUpdateBoard) => updateBoard({ ...props }),
    {
      ...options,
    }
  );

  return { mutate };
};
