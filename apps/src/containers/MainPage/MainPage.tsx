import React from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/LoginComponent/Login";
import Board from "./components/Board";
import { useGetBoardList } from "../../hooks/mainPageHooks/useGetBoard";

const MainPage = () => {
  const { data: boardList } = useGetBoardList();

  return (
    <Layout>
      <Announcement />
      <MainPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardSet>
          <div>
            <Board boardTitle="전체" isLarge={true} boardType={"공지"} />
          </div>
          <SmallBoard>
            {boardList &&
              boardList.data.map((item: string) => (
                <Board boardTitle={item} isLarge={false} boardType={item} />
              ))}
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
