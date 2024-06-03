import React from 'react';
import styled from 'styled-components';
import Announcement from '../../component/AnnounceComponent/Announcement';
import Login from '../../component/LoginComponent/Login';
import Board from './components/Board';
import { useGetMainBoardList } from '../../hooks/board/useGetBoard';

interface MainBoardResponse {
  boardType: string;
  name: string;
  numbering: number;
  simpleBoardList: SimpleBoardList[];
}
export interface SimpleBoardList {
  id: number;
  title: string;
  userName: string;
}
const MainPage = () => {
  const { data: boardList } = useGetMainBoardList();

  return (
    <Layout>
      <Announcement />
      <MainPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardSet>
          {boardList &&
            boardList.data.map((item: MainBoardResponse, idx: number) => {
              if (idx === 0)
                return (
                  <Board
                    boardTitle={'전체'}
                    isLarge={true}
                    key={item.numbering}
                    list={item.simpleBoardList}
                  />
                );
              else
                return (
                  <Board
                    boardTitle={item.name}
                    isLarge={false}
                    key={item.numbering}
                    list={item.simpleBoardList}
                  />
                );
            })}
        </BoardSet>
      </MainPageSet>
    </Layout>
  );
};
export default MainPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
  margin: 0 auto;
`;
const MainPageSet = styled.div`
  display: flex;
  gap: 32px;
`;
const BoardSet = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 840px;
  gap: 24px;
`;
const SmallBoard = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 24px;
`;
const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
