import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useCommentInfoSet = () => {
  const commentInfo = useSelector(
    (state: RootState) => state.commentInfoSet.commentInfo
  );
  return commentInfo;
};
export default useCommentInfoSet;
