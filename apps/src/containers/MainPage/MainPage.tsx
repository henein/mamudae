import React from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/LoginComponent/Login";
import Board from "./components/Board";
import { useGetBoard } from "../../hooks/mainPageHooks/useGetAllPost";

const MainPage = () => {
  const { data: entireBoard } = useGetBoard("E");
  const { data: freeBoard } = useGetBoard("F");
  const { data: humorBoard } = useGetBoard("H");
  const { data: bossBoard } = useGetBoard("B");
  const { data: infoBoard } = useGetBoard("I");
  return (
    <Layout>
      <Announcement />
      <MainPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardSet>
          <div>
            <Board boardTitle="전체" isLarge={true} content={entireBoard} />
          </div>
          <SmallBoard>
            <Board boardTitle="자유" isLarge={false} content={freeBoard} />
            <Board boardTitle="유머" isLarge={false} content={humorBoard} />
            <Board boardTitle="보스" isLarge={false} content={bossBoard} />
            <Board boardTitle="정보" isLarge={false} content={infoBoard} />
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
  gap: 32px;
`;
const BoardSet = styled.div`
  display: flex;
  flex-direction: column;
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
