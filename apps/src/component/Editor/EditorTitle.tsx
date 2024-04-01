import React from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ToolBarDivider } from './ToolBarDivider';
import { useGetBoardList } from '../../hooks/mainPageHooks/useGetBoard';

export interface EditorTitleProps {
  register: UseFormRegister<FieldValues>;
  board?: string;
}

export const EditorTitle: React.FC<EditorTitleProps> = (props) => {
  const { data: boardList } = useGetBoardList();

  return (
    <TitleBox>
      <SelectBoard {...props.register('selectBoard', { required: true })}>
        {boardList &&
          boardList.data.map((boardType: string) => (
            <option key={boardType} value={boardType}>
              {boardType}
            </option>
          ))}
      </SelectBoard>

      <ToolBarDivider />

      <Title
        placeholder="제목"
        type="text"
        {...props.register('title', { required: true })}
      />
    </TitleBox>
  );
};

const SelectBoard = styled.select`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
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

const Title = styled.input`
  width: 100%;
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
