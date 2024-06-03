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
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  width: ${(props) => (props.isLarge ? '816px' : '396px')};
  height: 332px;
  box-sizing: border-box;
  z-index: 0.5;
`;
