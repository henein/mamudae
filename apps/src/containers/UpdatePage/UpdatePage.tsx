import { useEditor } from '@tiptap/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../component/Button';
import { useUpdateBoard } from '../../hooks/writingPageHooks/useCreateBoard';
import { Editor, extensions } from '../../component/Editor/Editor';
import { useLocalStorage } from '../../hooks/storage/useLocalStorage';
import { useDetail } from '../../hooks/detailPageHooks/useDetail';
import { useRouter } from 'next/router';
import { ToolBarDivider } from '../../component/Editor/ToolBarDivider';

const UpdatePage = () => {
  const router = useRouter();
  const boardId = router.query.id as string;

  const { title, text } = useDetail({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const editor = useEditor({
    content: JSON.parse(text),
    extensions: extensions,
  });
  const { register, handleSubmit } = useForm({
    defaultValues: { title: title },
  });
  const { mutate } = useUpdateBoard();

  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage('access');

  const submit = (data: FieldValues) => {
    if (editor !== null && !editor.isEmpty) {
      mutate({
        accessToken,
        id: boardId,
        title: data['title'],
        text: JSON.stringify(editor?.getJSON()),
      });
    }
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <TitleBox>
        <Category>자유</Category>

        <ToolBarDivider />

        <Title
          placeholder="제목"
          type="text"
          {...register('title', { required: true })}
        />
      </TitleBox>

      <Editor editor={editor} />

      <ButtonBox>
        <Button type="submit" sort="primary">
          수정하기
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default UpdatePage;

const Container = styled.form`
  width: 1140px;
  margin: 24px auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
`;

const TitleBox = styled.div`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  position: relative;
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;

const Category = styled.p`
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
`;

const Title = styled.input`
  flex: 1;
  line-height: 100%;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;

  ::placeholder {
    color: ${({ theme }) => theme.subText};
  }
`;
