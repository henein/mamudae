import React from "react";
import styled from "styled-components";
import Login from "../../components/Login";
import Board from "./components/Board";

const MainPage = () => {
  return (
    <Layout>
      <div className='boardSet'>
        <div className='largeBoard'>
          <Board board_title='전체' isLarge={true} />
        </div>
        <div className='smallBoard'>
          <Board board_title='자유' isLarge={false} />
          <Board board_title='유머' isLarge={false} />
          <Board board_title='보스' isLarge={false} />
          <Board board_title='직업' isLarge={false} />
        </div>
      </div>
      <div className='aside'>
        <Login />
      </div>
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  display: flex;
  width: 1140px;
  margin: 0 auto;
  .boardSet {
    display: flex;
    flex-direction: column;
    width: 840px;
    gap: 24px;
  }
  .smallBoard {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  .aside {
    width: 300px;
    background-color: white;
  }
`;
