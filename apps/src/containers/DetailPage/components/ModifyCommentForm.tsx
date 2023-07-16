import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TextAreaAutoResize from "react-textarea-autosize";
import { useForm, FieldValues } from "react-hook-form";
// import { usePutLogic } from "../../../hooks/detailPageHooks/useCommentForm";
import useCommentInfoSet from "../../../hooks/reduxHooks/useCommentInfoSet";
import { usePutForm } from "../../../hooks/detailPageHooks/useCommentForm";

interface ModifyCommentFormType {
  isRecomment: boolean;
  setIsModifyClick: Dispatch<SetStateAction<boolean>>;
}

const ModifyCommentForm = ({ ...props }: ModifyCommentFormType) => {
  const { register, handleSubmit } = useForm();

  const commentInfo = useCommentInfoSet();

  console.log(props);
  const { putLogic } = usePutForm({
    isRecomment: props.isRecomment,
    boardId: commentInfo.boardId,
    commentId: commentInfo.commentId,
    tag: commentInfo.tag,
    replyId: commentInfo.replyId,
  });

  const submit = async (data: FieldValues) => {
    if (!localStorage.getItem("refresh")) {
      alert("로그인해야 이용할 수 있습니다.");
      return;
    } else {
      await putLogic(data);
      props.setIsModifyClick(false);
    }
  };

  return (
    <ContainerForm onSubmit={handleSubmit(submit)}>
      <WriteDiv>
        <StyledTextareaAutosize
          rows={1}
          {...register("comment")}
          defaultValue={
            props.isRecomment
              ? `@${commentInfo.tag} ${commentInfo.comment} `
              : `${commentInfo.comment}`
          }
        />
        <InputFunc>
          <CancelBtn onClick={() => props.setIsModifyClick(false)}>
            취소
          </CancelBtn>
          <SubmitBtn type="submit">수정하기</SubmitBtn>
        </InputFunc>
      </WriteDiv>
    </ContainerForm>
  );
};

export default ModifyCommentForm;

const ContainerForm = styled.form``;
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
  color: ${({ theme }) => theme.text};
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
const InputFunc = styled.div`
  display: "flex";
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
  color: ${({ theme }) => theme.brand};
  font-weight: 700;
  font-size: 12px;
`;
