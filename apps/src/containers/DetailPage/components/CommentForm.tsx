import React, { useState } from "react";
import styled from "styled-components";
import TextAreaAutoResize from "react-textarea-autosize";
import { FieldValues, useForm } from "react-hook-form";
import {
  usePostComment,
  usePostReComment,
} from "../../../hooks/detailPageHooks/useComment";

// props => setIsClick?, userData, boardId,commentId?,isRecomment
const CommentForm = ({ ...props }: any) => {
  const [isFocusInput, setIsFocusInput] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [formData, setFormData] = useState({
    boardId: "",
    comment: "",
    commentId: "",
    tag: "",
  });

  const mutateRe = usePostReComment(formData).mutate; // 대댓글 post api
  const mutate = usePostComment(formData).mutate; // 댓글 post api

  const submit = (data: FieldValues) => {
    if (!props.userData) {
      alert("로그인해야 이용할 수 있습니다.");
      reset();
      return;
    } else {
      setFormData({
        boardId: props.boardId,
        comment: JSON.stringify(data),
        commentId: props.commentId,
        tag: props.userData.username,
      });
      if (props.isRecomment) {
        mutateRe();
      } else {
        mutate();
      }
      reset();
    }
  };
  const cancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    props.setIsClick(false);
  };
  const cancelClick2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    setIsFocusInput(false);
  };
  return (
    <ContainerForm
      onSubmit={handleSubmit(submit)}
      isRecomment={props.isRecomment}
    >
      <WriteDiv>
        <StyledTextareaAutosize
          placeholder="댓글 쓰기"
          rows={1}
          {...register("comment")}
          onClick={() => setIsFocusInput(true)}
        />
        <InputFunc isRecomment={props.isRecomment} isFocusInput={isFocusInput}>
          <CancelBtn onClick={props.isRecomment ? cancelClick : cancelClick2}>
            취소
          </CancelBtn>
          <SubmitBtn type="submit">작성하기</SubmitBtn>
        </InputFunc>
      </WriteDiv>
    </ContainerForm>
  );
};

export default CommentForm;
const ContainerForm = styled.form<{ isRecomment: boolean }>`
  margin-bottom: ${({ isRecomment }) => !isRecomment && "20px"};
`;
const WriteDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${(prop) => prop.theme.border};
  background-color: ${(prop) => prop.theme.input};
`;
const StyledTextareaAutosize = styled(TextAreaAutoResize)`
  font-size: 14px;
  resize: none;
  color: ${({ theme }) => theme.Text};
  background-color: ${(prop) => prop.theme.input};
  border: none;
  padding: 0px;
  ::placeholder {
    color: ${(prop) => prop.theme.subText};
    font-size: 14px;
    font-weight: 400;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const InputFunc = styled.div<{ isRecomment: boolean; isFocusInput: boolean }>`
  display: ${({ isRecomment, isFocusInput }) =>
    isRecomment ? "flex" : isFocusInput ? "flex" : "none"};
  justify-content: end;
  gap: 4px;
`;
const CancelBtn = styled.button`
  padding: 4px 8px;
  color: ${({ theme }) => theme.subText};
  font-weight: 500;
  font-size: 12px;
`;
const SubmitBtn = styled.button`
  padding: 4px 8px;
  color: ${({ theme }) => theme.Brand};
  font-weight: 700;
  font-size: 12px;
`;
