import { useQuery } from "react-query";
import { getSearchList, SearchListParams } from "../../api/search";

export const useGetSearchList = ({ type, value, page }: SearchListParams) => {
  const { data: searchData, isLoading } = useQuery(
    ["search", type, value, page],
    () => getSearchList({ type, value, page }),
    {
      refetchOnWindowFocus: false,
    }
  );
  return { searchData, isLoading };
};
