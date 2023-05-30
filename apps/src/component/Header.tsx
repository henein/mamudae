import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleDarkMode } from '../../store/darkmodeSlice/darkmode';
import SvgIcon from '@mui/material/SvgIcon';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useScroll from '../hooks/scrollHooks/useScroll';

const Header = () => {
  const { isScrollDown, stickyTop } = useScroll();
  const dispatch = useDispatch();
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  return (
    <Container isScrollDown={isScrollDown} stickyTop={stickyTop}>
      <Background darkModeState={darkModeState} stickyTop={stickyTop}>
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
                <SvgIcon component={LightModeIcon} fontSize="small" />
              </LightImg>
              <DarkImg darkModeState={darkModeState}>
                <SvgIcon component={DarkModeIcon} fontSize="small" />
              </DarkImg>
            </DarkModeBtn>
            <InputBox>
              <InlineInput></InlineInput>
              <SubmitBtn>
                <SvgIcon component={SearchIcon} inheritViewBox />
              </SubmitBtn>
            </InputBox>
          </RightDiv>
        </TitleBox>
      </Background>
    </Container>
  );
};

export default Header;
const Container = styled.header<{ isScrollDown: boolean; stickyTop: boolean }>`
  position: ${({ stickyTop }) => stickyTop && 'sticky'};
  top: 0;
  z-index: 1000;
  transform: ${({ isScrollDown }) =>
    isScrollDown ? 'translateY(-73px)' : 'none'};
  transition: transform 0.2s ease-in-out;
`;
const Background = styled.div<{ darkModeState: boolean; stickyTop: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ stickyTop, theme }) =>
    stickyTop ? theme.card : 'none'};
  border-bottom: ${({ stickyTop, theme }) =>
    stickyTop ? `1px solid ${theme.border}` : 'none'};
  box-shadow: ${({ stickyTop, theme, darkModeState }) =>
    stickyTop
      ? `0px 4px 8px ${darkModeState == false && theme.shadow}`
      : 'none'};
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
  align-items: ${({ stickyTop }) => (stickyTop ? 'center' : 'flex-end')};
  height: ${({ stickyTop }) => (stickyTop ? '72px' : '64px')};
  width: 1140px;
  margin: 0 auto;
  background-color: ${({ stickyTop, theme }) =>
    stickyTop ? theme.card : 'none'};
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  line-height: 38px;
  color: ${({ theme }) => theme.Brand};
`;
const DarkModeBtn = styled.button`
  display: flex;
  padding: 2px;
  background-color: ${({ theme }) => theme.chatBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const LightImg = styled.div<{ darkModeState: boolean }>`
  color: ${({ theme }) => theme.footerText};
  padding: 5px;
  border-radius: 8px;
  background-color: ${({ darkModeState, theme }) =>
    darkModeState ? 'none' : theme.cardHeader};
  border: ${({ darkModeState, theme }) =>
    darkModeState
      ? `1px solid ${theme.chatBackground}`
      : `1px solid ${theme.border}`};
  box-sizing: border-box;
`;
const DarkImg = styled.div<{ darkModeState: boolean }>`
  color: ${({ theme }) => theme.footerText};
  padding: 5px;
  border-radius: 8px;
  background-color: ${({ darkModeState, theme }) =>
    darkModeState ? theme.cardHeader : 'none'};
  border: ${({ darkModeState, theme }) =>
    darkModeState
      ? `1px solid ${theme.border}`
      : `1px solid ${theme.chatBackground}`};
  box-sizing: border-box;
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
`;
const Listdiv = styled.div<{ stickyTop: boolean }>`
  box-sizing: border-box;
  text-decoration: none;
  color: ${({ theme }) => theme.Text};
  padding: 10.5px 16px;
  line-height: 19px;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.headerButtonHover};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.shadow};
    border-radius: 8px;
  }
`;
const InputBox = styled.form`
  background-color: ${({ theme }) => theme.input};
  width: 240px;
  height: 40px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
`;
const InlineInput = styled.input`
  background-color: ${({ theme }) => theme.input};
  width: 200px;
  height: 38px;
  border: none;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 2px;
  margin: 0;
  border: 0;
  background-color: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.Brand};
  &:hover {
    cursor: pointer;
  }
`;
