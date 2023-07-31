import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import SelectOptions from "./components/SelectOptions";
import Profile from "./components/Profile";
import Character from "./components/Character";
import Activity from "./components/Activity";
import Login from "../../component/LoginComponent/Login";
import CompleteLogin from "../../component/LoginComponent/CompleteLogin";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
const MyPage = () => {
  const [option, setOption] = useState<number>(1);

  const getOptionNum = (optionNum: number) => {
    setOption(optionNum);
  };

  const { getLocalStorage } = useLocalStorage();

  const accessToken = getLocalStorage("access");
  const userData = useUserInfo({
    accessToken,
    options: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  }).data;

  return (
    <Layout>
      <Announcement />
      <MyPageSet>
        <Aside>{userData ? <CompleteLogin {...userData} /> : <Login />}</Aside>
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
`;
