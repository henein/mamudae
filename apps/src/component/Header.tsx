import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import DarkModeIcon from '/public/headerCompoImages/dark_mode.svg';
import LightModeIcon from '/public/headerCompoImages/light_mode.svg';
import useScroll from '../hooks/scrollHooks/useScroll';
import { Logo } from './Logo';
import SearchBox from './SearchBox';
import useDarkMode from '../hooks/reduxHooks/useDarkMode';

const Header = () => {
  const { toggle, darkModeState } = useDarkMode();
  const { isScrollDown, stickyTop } = useScroll();

  return (
    <Container isScrollDown={isScrollDown} stickyTop={stickyTop}>
      <Background stickyTop={stickyTop}>
        <TitleBox stickyTop={stickyTop}>
          <LeftDiv>
            <LogoLink href="/">
              <Logo size="small" />
            </LogoLink>
            <Nav>
              <Link href="/board/공지">
                <NavItem stickyTop={stickyTop}>공지</NavItem>
              </Link>
              <Link href="/">
                <NavItem stickyTop={stickyTop}>커뮤니티</NavItem>
              </Link>
            </Nav>
          </LeftDiv>
          <RightDiv>
            <DarkModeBtn onClick={toggle}>
              <LightImg darkModeState={darkModeState}>
                <LightModeIcon width="20px" height="20px" />
              </LightImg>
              <DarkImg darkModeState={darkModeState}>
                <DarkModeIcon width="20px" height="20px" />
              </DarkImg>
            </DarkModeBtn>
            <SearchBox type={'ALL'} />
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
const Background = styled.div<{ stickyTop: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ stickyTop, theme }) =>
    stickyTop ? theme.card : 'none'};
  border-bottom: ${({ stickyTop, theme }) =>
    stickyTop ? `1px solid ${theme.border}` : 'none'};
  box-shadow: ${({ stickyTop, theme }) =>
    stickyTop && `0px 4px 8px ${theme.boxShadow}`};
  max-width: 1140px;
  margin: 0px auto;
`;
const LeftDiv = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-end;
`;
const RightDiv = styled.div`
  display: flex;
  gap: 16px;
  width: 327px;
`;
const TitleBox = styled.div<{ stickyTop: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ stickyTop }) => (stickyTop ? 'center' : 'flex-end')};
  height: ${({ stickyTop }) => (stickyTop ? '72px' : '64px')};
  width: 100%;
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
