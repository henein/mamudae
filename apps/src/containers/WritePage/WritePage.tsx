import { useEditor } from '@tiptap/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../component/Button';
import { useCreateBoard } from '../../hooks/writingPageHooks/useCreateBoard';
import { Editor, extensions } from '../../component/Editor/Editor';
import { useLocalStorage } from '../../hooks/storage/useLocalStorage';
import { EditorTitle } from '../../component/Editor/EditorTitle';
import { useRouter } from 'next/router';

const WritePage = () => {
  const router = useRouter();

  const editor = useEditor({
    extensions: extensions,
  });
  const { register, handleSubmit, formState, reset } = useForm();
  const { mutate } = useCreateBoard();

  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage('access');

  const submit = (data: FieldValues) => {
    if (editor !== null && !editor.isEmpty) {
      mutate(
        {
          accessToken,
          title: data['title'],
          boardType: data['selectBoard'],
          text: JSON.stringify(editor?.getJSON()),
        },
        {
          onSuccess: (data) => {
            console.log(data)
            router.back();
          },
          onError: (error) => {
            alert(error);
            reset();
          },
        }
      );
    }
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <EditorTitle register={register} />

      <Editor editor={editor} />

      <ButtonBox>
        {/* <Button type="button" sort="secondary">
          저장하기
        </Button>
        <Button type="button" sort="secondary">
          불러오기
        </Button> */}
        <Button type="submit" sort="primary">
          등록하기
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default WritePage;

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
