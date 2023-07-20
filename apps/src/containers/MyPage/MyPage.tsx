import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/Login";
import SelectOptions from "./components/SelectOptions";
import Profile from "./components/Profile";
import Character from "./components/Character";
import Activity from "./components/Activity";
const MyPage = () => {
  let option;
  const getOptionNum = (optionNum: number) => {
    option = optionNum;
  };

  return (
    <Layout>
      <Announcement />
      <MyPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardContent>
          <SelectOptions getOptionNum={getOptionNum} />
          {option == 1 ? (
            <Profile />
          ) : option == 2 ? (
            <Character />
          ) : (
            <Activity />
          )}
        </BoardContent>
      </MyPageSet>
    </Layout>
  );
};

export default MyPage;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 1140px;
  margin: 0 auto;
  box-sizing: border-box;
`;
const MyPageSet = styled.div`
  display: flex;
  gap: 32px;
`;

const Aside = styled.aside`
  display: flex;
  width: 300px;
`;

const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 808px;
  gap: 24px;
`;
