import React from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/Login";
import CharSelectBox from "./components/CharSelectBox";
import LabelSelectBox from "./components/LabelSelectBox";

const MyPage = () => {
  return (
    <Layout>
      <Announcement />
      <MyPageSet>
        <Aside>
          <Login />
        </Aside>
        <BoardContent>
          <CharSelectBox />
          <LabelSelectBox />
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
