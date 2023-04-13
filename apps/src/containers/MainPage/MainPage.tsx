import React from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/Login";
import Board from "./components/Board";

export type BoardInfoType = {
  board_title: "전체" | "자유" | "유머" | "보스" | "직업";
  isLarge?: boolean;
};

const MainPage = () => {
  return (
    <Layout>
      <Announcement />
      <MainPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardSet>
          <div>
            <Board board_title='전체' isLarge={true} />
          </div>
          <SmallBoard>
            <Board board_title='자유' isLarge={false} />
            <Board board_title='유머' isLarge={false} />
            <Board board_title='보스' isLarge={false} />
            <Board board_title='직업' isLarge={false} />
          </SmallBoard>
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
`;
const BoardSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
