import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { customColor } from "../constants/customColor";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleDarkMode } from "../../store/darkmodeSlice/darkmode";

const Header = () => {
  const dispatch = useDispatch();
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  console.log(darkModeState);
  return (
    <Layout>
      <LayoutTop>
        <TitleBox>
          <SetContent>
            <Link href='/'>
              <Title>Henein</Title>
            </Link>
            <DarkModeBtn onClick={() => dispatch(toggleDarkMode())}>
              <LightImg darkModeState={darkModeState}>
                <Image
                  src='/headerCompoImages/light_mode.svg'
                  width='20'
                  height='20'
                  alt='light_mode'
                />
              </LightImg>
              <DarkImg darkModeState={darkModeState}>
                <Image
                  src='/headerCompoImages/dark_mode.svg'
                  width='20'
                  height='20'
                  alt='dark_mode'
                />
              </DarkImg>
            </DarkModeBtn>
          </SetContent>
        </TitleBox>
      </LayoutTop>

      <LayoutBottom>
        <SetContent>
          <NavList>
            <Link href='/'>
              <Listdiv>홈</Listdiv>
            </Link>
            <Link href='/'>
              <Listdiv>공지</Listdiv>
            </Link>
            <Link href='/'>
              <Listdiv>정보</Listdiv>
            </Link>
            <Link href='/'>
              <Listdiv>커뮤니티</Listdiv>
            </Link>
          </NavList>
          <InputBox>
            <InlineInput></InlineInput>
            <SubmitBtn>
              <Image
                src='/headerCompoImages/search.svg'
                width='18'
                height='18'
                alt='search'
              />
            </SubmitBtn>
          </InputBox>
        </SetContent>
      </LayoutBottom>
    </Layout>
  );
};

export default Header;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const LayoutTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 12px;
  height: 116px;
  width: 1140px;
  margin: 0 auto;
`;
const SetContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1140px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
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
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ darkModeState }) =>
    darkModeState ? "none" : customColor.white};
  border: ${({ darkModeState }) =>
    darkModeState
      ? `1px solid ${customColor.boardHeaderGray}`
      : `1px solid ${customColor.borderColor}`};
`;
const DarkImg = styled.div<{ darkModeState: boolean }>`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ darkModeState }) =>
    darkModeState ? customColor.white : "none"};
  border: ${({ darkModeState }) =>
    darkModeState
      ? `1px solid ${customColor.borderColor}`
      : `1px solid ${customColor.boardHeaderGray}`};
`;
const LayoutBottom = styled.div`
  display: flex;
  justify-content: center;
  height: 56px;
  z-index: 999;
  border: 1px solid ${customColor.whiteGray};
  background-color: ${customColor.white};
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
`;
const Listdiv = styled.div`
  text-decoration: none;
  color: ${customColor.black};
  padding: 18.5px 16px;
`;
const InputBox = styled.form`
  background-color: ${customColor.white};
  width: 240px;
  height: 32px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${customColor.whiteGray};
`;
const InlineInput = styled.input`
  width: 200px;
  height: 30px;
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
