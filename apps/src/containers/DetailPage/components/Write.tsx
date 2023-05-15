import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { usePostComment } from "../../../hooks/detailPageHooks/useComment";
import useDarkMode from "../../../hooks/reduxHooks/useDarkMode";

interface postinfos {
  id: string;
  userData: any;
}
const Write = ({ id, userData }: postinfos) => {
  // formdata로 id,commet,userId 받음
  // id=boardId, userId=userInfo에 username, comment=입력받은것
  // commentId는 불필요하다고 생각하여 뺌 -> 백엔드와 논의 필요
  const [formData, setFormData] = useState({
    id: "",
    comment: "",
    userId: "",
  });
  const { mutate } = usePostComment(formData);

  const { register, handleSubmit } = useForm();

  const submit = (data: FieldValues) => {
    if (!userData) {
      alert("로그인해야 이용할 수 있습니다.");
      return;
    } else {
      setFormData({
        id: id,
        comment: JSON.stringify(data),
        userId: userData.username,
      });
      // alert(JSON.stringify(data));
      mutate();
    }
  };

  return (
    <WriteForm onSubmit={handleSubmit(submit)}>
      <NumberOfComments>댓글 2개</NumberOfComments>
      <WriteComment
        {...register("comment")}
        type="text"
        placeholder="댓글 작성"
      />
    </WriteForm>
  );
};

export default Write;

const WriteComment = styled.input`
  padding: 12px 8px;
  border-radius: 8px;
  border: 1px solid ${(prop) => prop.theme.border};
  background-color: ${(prop) => prop.theme.input};
  margin-bottom: 20px;
  ::placeholder {
    color: ${(prop) => prop.theme.subText};
  }
`;
const NumberOfComments = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
  margin-top: 20px;
  color: ${(prop) => prop.theme.Text};
`;
const WriteForm = styled.form`
  z-index: 1;
  top: 0;
  box-shadow: ${({ theme }) => `0px 4px 8px ${theme.boxShadow}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  min-height: 97px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 24px;
  position: sticky;
  background-color: ${(prop) => prop.theme.cardHeader};
`;
