import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Profile from "./components/Profile";
import Character from "./components/Character";
import Activity from "./components/Activity";
import Login from "../../component/LoginComponent/Login";
import CompleteLogin from "../../component/LoginComponent/CompleteLogin";
import { useUserInfo } from "../../hooks/user/useUserInfo";
import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
const MyPage = () => {
  const [option, setOption] = useState<number>(1);

  useEffect(() => {
    const initValue = localStorage.getItem("myPageOption");
    if (!initValue) setOption(1);
    else {
      setOption(Number(initValue));
    }
  }, []);

  const optionClick = (num: number) => {
    localStorage.setItem("myPageOption", num.toString());
    setOption(num);
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
          <SelectOption>
            <OptionBtn isSelect={option == 1} onClick={() => optionClick(1)}>
              프로필
            </OptionBtn>
            <OptionBtn isSelect={option == 2} onClick={() => optionClick(2)}>
              캐릭터
            </OptionBtn>
            <OptionBtn isSelect={option == 3} onClick={() => optionClick(3)}>
              활동
            </OptionBtn>
          </SelectOption>
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

const SelectOption = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: white;
  margin-bottom: 24px;
`;
const buttonStyle = css<{ isSelect: boolean }>`
  padding: 20px 24px;
  color: ${({ isSelect, theme }) => (isSelect ? theme.text : theme.subText)};
  font-size: 16px;
  font-weight: ${({ isSelect }) => (isSelect ? "700" : "400")};
  line-height: normal;
  border-bottom: ${({ isSelect, theme }) =>
    isSelect
      ? `2px solid
    ${theme.brand}`
      : ""};
`;

const OptionBtn = styled.button`
  ${buttonStyle}
  background-color: none;
`;
