import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { customColor } from "../constants/customColor";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleDarkMode } from "../../store/darkmodeSlice/darkmode";

type HeaderPropType = {
  stickyTop: boolean;
};
const Header = ({ stickyTop }: HeaderPropType) => {
  const dispatch = useDispatch();
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  return (
    <Layout stickyTop={stickyTop}>
      <TitleBox stickyTop={stickyTop}>
        <LeftDiv>
          <Link href="/">
            <Title>Henein</Title>
          </Link>
          <NavList>
            <Link href="/">
              <Listdiv stickyTop={stickyTop}>홈</Listdiv>
            </Link>
            <Link href="/">
              <Listdiv stickyTop={stickyTop}>공지</Listdiv>
            </Link>
            <Link href="/">
              <Listdiv stickyTop={stickyTop}>정보</Listdiv>
            </Link>
            <Link href="/">
              <Listdiv stickyTop={stickyTop}>커뮤니티</Listdiv>
            </Link>
          </NavList>
        </LeftDiv>
        <RightDiv>
          <DarkModeBtn onClick={() => dispatch(toggleDarkMode())}>
            <LightImg darkModeState={darkModeState}>
              <Image
                src="/headerCompoImages/light_mode.svg"
                width="18"
                height="18"
                alt="light_mode"
              />
            </LightImg>
            <DarkImg darkModeState={darkModeState}>
              <Image
                src="/headerCompoImages/dark_mode.svg"
                width="18"
                height="18"
                alt="dark_mode"
              />
            </DarkImg>
          </DarkModeBtn>
          <InputBox>
            <InlineInput></InlineInput>
            <SubmitBtn>
              <Image
                src="/headerCompoImages/search.svg"
                width="18"
                height="18"
                alt="search"
              />
            </SubmitBtn>
          </InputBox>
        </RightDiv>
      </TitleBox>
    </Layout>
  );
};

export default Header;
const Layout = styled.div<{ stickyTop: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ stickyTop }) =>
    stickyTop ? customColor.white : "none"};
  border-bottom: ${({ stickyTop }) =>
    stickyTop ? "1px solid #0000001A" : "none"};
  box-shadow: ${({ stickyTop }) =>
    stickyTop ? "0px 4px 8px rgba(0, 0, 0, 0.05)" : "none"};
`;
const LeftDiv = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-end;
`;
const RightDiv = styled.div`
  display: flex;
  gap: 16px;
`;
const TitleBox = styled.div<{ stickyTop: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ stickyTop }) => (stickyTop ? "center" : "flex-end")};
  height: ${({ stickyTop }) => (stickyTop ? "72px" : "64px")};
  width: 1140px;
  margin: 0 auto;
  background-color: ${({ stickyTop }) =>
    stickyTop ? customColor.white : "none"};
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  line-height: 38px;
  color: ${customColor.orange};
`;
const DarkModeBtn = styled.button`
  display: flex;
  padding: 2px;
  background-color: ${customColor.boardHeaderGray};
  border: 1px solid ${customColor.borderColor};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const LightImg = styled.div<{ darkModeState: boolean }>`
  padding: 6px;
  border-radius: 8px;
  background-color: ${({ darkModeState }) =>
    darkModeState ? "none" : customColor.white};
  border: ${({ darkModeState }) =>
    darkModeState
      ? `1px solid ${customColor.boardHeaderGray}`
      : `1px solid ${customColor.borderColor}`};
  box-sizing: border-box;
`;
const DarkImg = styled.div<{ darkModeState: boolean }>`
  padding: 6px;
  border-radius: 8px;
  background-color: ${({ darkModeState }) =>
    darkModeState ? customColor.white : "none"};
  border: ${({ darkModeState }) =>
    darkModeState
      ? `1px solid ${customColor.borderColor}`
      : `1px solid ${customColor.boardHeaderGray}`};
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
`;
const Listdiv = styled.div<{ stickyTop: boolean }>`
  box-sizing: border-box; // 추가
  text-decoration: none;
  color: ${customColor.black};
  padding: 10.5px 16px;
  line-height: 19px;
  font-size: 16px;
  &:hover {
    background-color: #ededed;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
`;
const InputBox = styled.form`
  background-color: ${customColor.white};
  width: 240px;
  height: 40px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${customColor.whiteGray};
`;
const InlineInput = styled.input`
  width: 200px;
  height: 38px;
  border: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
const SubmitBtn = styled.button`
  width: 24px;
  height: 24px;
  padding: 2px;
  margin: 0;
  border: 0;
  background-color: ${customColor.white};
  &:hover {
    cursor: pointer;
  }
`;
