import React from 'react';
import styled from 'styled-components';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ToolBarDivider } from './ToolBarDivider';

export interface EditorTitleProps {
  register: UseFormRegister<FieldValues>;
  board?: string;
}

export const EditorTitle: React.FC<EditorTitleProps> = (props) => {
  return (
    <TitleBox>
      <SelectBoard {...props.register('selectBoard', { required: true })}>
        <option value="F">자유</option>
        <option value="I">정보</option>
        <option value="H">유머</option>
        <option value="B">보스</option>
        <option value="I">직업</option>
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
