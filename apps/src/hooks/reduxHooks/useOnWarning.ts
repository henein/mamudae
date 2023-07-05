import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useOnWarning = () => {
  const { isWarning, warningType } = useSelector(
    (state: RootState) => state.onWarning
  );
  return { isWarning, warningType };
};
export default useOnWarning;
