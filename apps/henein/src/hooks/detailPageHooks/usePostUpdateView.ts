import { useMutation } from "react-query";
import { postUpdateView } from "../../api/postUpdateView";

interface IPostUpdateView {
  id: number;
  options?: any;
}

export const usePostUpdateView = ({ id, options }: IPostUpdateView) => {
  const { mutate: updateView } = useMutation(
    ["postUpdateView", id],
    () => postUpdateView(id),
    {
      ...options,
      onSuccess: (data) => console.log(data),
      onError: (err) => console.log(err),
    }
  );

  return { updateView };
};
