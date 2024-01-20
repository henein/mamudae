import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useOnWarning = () => {
  const { isWarning, warningType, warningLocation } = useSelector(
    (state: RootState) => state.onWarning
  );
  return { isWarning, warningType, warningLocation };
};
export default useOnWarning;
