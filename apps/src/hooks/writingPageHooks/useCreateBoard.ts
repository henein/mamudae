import { useMutation } from "react-query";
import { createBoard } from "../../api/createBoard";

export const useCreateBoard = (boardType: string, options?: object) => {
  const { mutate } = useMutation(() => createBoard(boardType), {
    ...options,
  });

  return { mutate };
};
