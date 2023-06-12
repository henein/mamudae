import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../../component/Button';
import { useCreateBoard } from '../../hooks/writingPageHooks/useCreateBoard';
import { FormInputCss } from '../LoginPage/components/Login';
import { Editor } from './components/Editor';
import { ToolBarDivider } from './components/ToolBarDivider';
import { useLocalStorage } from '../../hooks/storage/useLocalStorage';

const WritingPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: '내용을 입력해주세요...' }),
      Underline,
      Image,
    ],
  });
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateBoard();

  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage('access');

  const submit = (data: FieldValues) => {
    if (editor !== null && !editor.isEmpty) {
      mutate({
        accessToken,
        title: data['title'],
        boardType: data['selectBoard'],
        text: JSON.stringify(editor?.getJSON()),
      });
    }
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <TitleBox>
        <SelectBoard {...register('selectBoard', { required: true })}>
          <option value="F">자유</option>
          <option value="I">정보</option>
          <option>유머</option>
        </SelectBoard>

        <ToolBarDivider />

        <Title
          placeholder="제목"
          type="text"
          {...register('title', { required: true })}
        />
      </TitleBox>

      <Editor editor={editor} />

      <ButtonBox>
        <Button type="button" sort="sub" width="81px" height="41px">
          저장하기
        </Button>
        <Button type="button" sort="sub" width="81px" height="41px">
          불러오기
        </Button>
        <Button type="submit" sort="main" width="81px" height="41px">
          등록하기
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default WritingPage;

const Container = styled.form`
  width: 1140px;
  margin: 0 auto;
`;

const SelectBoard = styled.select`
  position: relative;
  left: 16px;
  border: none;
  background-color: transparent;
  outline: none;
  z-index: 1;
  color: ${({ theme }) => theme.Text};
`;

const TitleBox = styled.div`
  height: 59px;
  margin-top: 24px;
  margin-bottom: 16px;
  display: flex;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Title = styled.input`
  ${FormInputCss}
  height: 100%;
  padding: 0 0 0 101px;
  border-radius: 16px;
  position: absolute;
  line-height: 100%;
  color: ${({ theme }) => theme.Text};

  ::placeholder {
    color: ${({ theme }) => theme.subText};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  margin-top: 16px;
`;
