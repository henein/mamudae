import { useState } from "react";
import { PComment, RComment } from "../../api/comment";
import { useLocalStorage } from "../storage/useLocalStorage";
import {
  usePostComment,
  usePostReComment,
} from "../../hooks/detailPageHooks/useComment";
import { FieldValues } from "react-hook-form";

// post,put,delete 요청에 대한 각각의 form 만들어주는 hook

/**
 * isRecomment : 댓글, 대댓글 판별
 * boardId : 게시글 id
 * commentId : 부모 댓글 id
 * loginUser : 현재 로그인된 유저
 * data : react-hook-form의 input register 이름
 */
export const usePostForm = ({
  isRecomment,
  boardId,
  commentId,
  loginUser,
}: any) => {
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");

  const [PFormData, setPFormData] = useState<PComment>({
    boardId: "",
    comment: "",
    commentId: "",
    accessToken,
  });
  const [RFormData, setRFormData] = useState<RComment>({
    boardId: "",
    comment: "",
    commentId: "",
    replyId: "",
    tag: "",
    accessToken,
  });

  const { postReComments } = usePostReComment(RFormData); // 대댓글 post api
  const { postComments } = usePostComment(PFormData); // 댓글 post api

  const postLogic = async (data: FieldValues) => {
    const commentWithoutTag = data.comment.replace(
      "@" + loginUser.userName,
      ""
    );

    if (isRecomment) {
      await setRFormData({
        ...RFormData,
        boardId: boardId,
        comment: commentWithoutTag.trim(),
        commentId: commentId ?? "",
        tag: data.comment.includes("@" + loginUser.userName)
          ? loginUser.userName
          : "",
      });
      return await postReComments();
    } else {
      await setPFormData({
        ...PFormData,
        boardId: boardId,
        comment: data.comment,
        commentId: commentId ?? "",
      });
      return await postComments();
    }
  };

  return { postLogic };
};
