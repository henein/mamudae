import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useGetLoginUser = () => {
  return useSelector((state: RootState) => state.userInfo);
};
export default useGetLoginUser;
