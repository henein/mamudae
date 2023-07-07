import { useState } from "react";
import { PComment, RComment } from "../../api/comment";
import { useLocalStorage } from "../storage/useLocalStorage";
import {
  usePostComment,
  usePostReComment,
} from "../../hooks/detailPageHooks/useComment";
import { FieldValues } from "react-hook-form";
import {
  useDelComment,
  useDelReComment,
} from "../../hooks/detailPageHooks/useComment";

// post,put,delete 요청에 대한 각각의 form 만들어주는 hook

/**
 * isRecomment : 댓글, 대댓글 판별
 * boardId : 게시글 id
 * commentId : 부모 댓글 id
 * loginUser : 현재 로그인된 유저
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
    accessToken,
  });
  const [RFormData, setRFormData] = useState<RComment>({
    boardId: "",
    comment: "",
    commentId: "",
    tag: "",
    accessToken,
  });

  const { postReComments } = usePostReComment(RFormData); // 대댓글 post api
  const { postComments } = usePostComment(PFormData); // 댓글 post api

  // post시, 돌아가는 로직
  // data : react-hook-form의 input register 이름
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
      });
      return await postComments();
    }
  };

  return { postLogic };
};

/**
 * isRecomment : 댓글, 대댓글 판별
 * boardId : 게시글 id
 * commentId : 부모 댓글 id
 * replyId : 자식 댓글 id
 */
export const useDeleteForm = ({
  isRecomment,
  boardId,
  commentId,
  replyId,
}: any) => {
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");

  // delete시, 부모 comment면 보내야되는 데이터 폼
  const [PFormData, setPFormData] = useState<PComment>({
    boardId: "",
    commentId: "",
    accessToken,
  });
  // delete시, 자식 comment면 보내야되는 데이터 폼
  const [RFormData, setRFormData] = useState<RComment>({
    boardId: "",
    replyId: "",
    accessToken,
  });

  const { delReComments } = useDelReComment(RFormData); // 대댓글 post api
  const { delComments } = useDelComment(PFormData); // 댓글 post api

  const deleteLogic = async () => {
    if (isRecomment) {
      await setRFormData({
        ...RFormData,
        boardId: boardId,
        replyId: replyId,
      });
      return await delReComments();
    } else {
      await setPFormData({
        ...PFormData,
        boardId: boardId,
        commentId: commentId,
      });
      return await delComments();
    }
  };

  return { deleteLogic };
};
