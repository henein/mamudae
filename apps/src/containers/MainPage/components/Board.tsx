import React from 'react';
import styled from 'styled-components';
import UserPostList from './UserPostList';
import BoardHead from './BoardHead';
import { SimpleBoardList } from '../MainPage';

interface Props {
  boardTitle: string;
  isLarge?: boolean;
  list: SimpleBoardList[];
}

function Board({ boardTitle, isLarge, list }: Props) {
  return (
    <BoardContent isLarge={isLarge}>
      <BoardHead boardTitle={boardTitle} />
      <UserPostList boardTitle={boardTitle} data={list} />
    </BoardContent>
  );
}
export default Board;

const BoardContent = styled.div<{ isLarge?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  max-width: ${(props) => (props.isLarge ? '808px' : '392px')};
  height: 332px;
  box-sizing: border-box;
  width: 100%;
  @media screen and (max-width: 1139px) {
    max-width: 100%;
  }
`;
