import { useQuery } from "react-query";
import { detail } from "../../api/detail";

interface IUseDetail {
  id: string;
  options?: any;
}

export function useDetail({ id, options }: IUseDetail) {
  const { data } = useQuery(["detailPageData", id], () => detail(id), {
    ...options,
  });

  console.log(data);
  return { ...data };
}
