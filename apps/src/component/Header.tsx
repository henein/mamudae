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
import { Logo } from './Logo';

const Header = () => {
  const dispatch = useDispatch();
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );
  const { isScrollDown, stickyTop } = useScroll();

  const onClick = () => {
    dispatch(toggleDarkMode());
  };

  console.log(darkModeState);

  return (
    <Container isScrollDown={isScrollDown} stickyTop={stickyTop}>
      <Background darkModeState={darkModeState} stickyTop={stickyTop}>
        <TitleBox stickyTop={stickyTop}>
          <LeftDiv>
            <LogoLink href="/">
              <Logo size="small" />
            </LogoLink>
            <Nav>
              <Link href="/">
                <NavItem stickyTop={stickyTop} isSelect>
                  홈
                </NavItem>
              </Link>
              <Link href="/">
                <NavItem stickyTop={stickyTop}>공지</NavItem>
              </Link>
              <Link href="/">
                <NavItem stickyTop={stickyTop}>커뮤니티</NavItem>
              </Link>
            </Nav>
          </LeftDiv>
          <RightDiv>
            <DarkModeBtn onClick={onClick}>
              <LightImg darkModeState={darkModeState}>
                <SvgIcon component={LightModeIcon} fontSize="small" />
              </LightImg>
              <DarkImg darkModeState={darkModeState}>
                <SvgIcon component={DarkModeIcon} fontSize="small" />
              </DarkImg>
            </DarkModeBtn>
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
  box-shadow: ${({ stickyTop, theme }) =>
    stickyTop && `0px 4px 8px ${theme.boxShadow}`};
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
const LogoLink = styled(Link)`
  line-height: 0;
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
const Nav = styled.div`
  display: flex;
  align-items: center;
`;
const NavItem = styled.div<{ stickyTop: boolean; isSelect?: boolean }>`
  box-sizing: border-box;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 10.5px 16px;
  line-height: 19px;
  font-size: 16px;
  font-weight: ${({ isSelect }) => (isSelect ? 600 : 400)};
  border-radius: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.headerButtonHover};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.border} inset;
    font-weight: 600;
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
  padding-left: 8px;
  color: ${({ theme }) => theme.subText};
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
  color: ${({ theme }) => theme.brand};
  &:hover {
    cursor: pointer;
  }
`;
