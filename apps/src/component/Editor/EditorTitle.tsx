import React from 'react';
import styled from 'styled-components';
import { FormInputCss } from '../../containers/LoginPage/components/Login';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ToolBarDivider } from './ToolBarDivider';

export interface EditorTitleProps {
    register: UseFormRegister<FieldValues>
}

export const EditorTitle: React.FC<EditorTitleProps> = (props) => {
  return (
    <TitleBox>
      <SelectBoard {...props.register('selectBoard', { required: true })}>
        <option value="F">자유</option>
        <option value="I">정보</option>
        <option>유머</option>
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
  position: relative;
  left: 16px;
  border: none;
  background-color: transparent;
  outline: none;
  z-index: 1;
  color: ${({ theme }) => theme.text};
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
  color: ${({ theme }) => theme.text};

  ::placeholder {
    color: ${({ theme }) => theme.subText};
  }
`;
