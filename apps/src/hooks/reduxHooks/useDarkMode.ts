import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useDarkMode = () => {
  return useSelector((state: RootState) => state.darkMode.isDarkMode);
};
export default useDarkMode;
