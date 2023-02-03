import React from "react";
import styled from "styled-components";
import Login from "../../components/Login";
import Board from "./components/Board";

export type BoardInfoType = {
  board_title: "전체" | "자유" | "유머" | "보스" | "직업";
  isLarge: boolean;
};

const MainPage = () => {
  return (
    <Layout>
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

      <Aside>
        <Login />
      </Aside>
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  display: flex;
  width: 1140px;
  margin: 0 auto;
`;
const BoardSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 840px;
  gap: 24px;
`;
const SmallBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;
const Aside = styled.aside`
  width: 300px;
  background-color: white;
`;
