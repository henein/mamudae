import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";

const Header = () => {
  return (
    <Layout>
      <LayoutTop>
        <TitleBox>
          <Link href='/'>
            <Title>Henein</Title>
          </Link>
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
        </TitleBox>
      </LayoutTop>

      <LayoutBottom>
        <NavList>
          <Link href='/'>홈</Link>
          <Link href='/'>더치트</Link>
        </NavList>
      </LayoutBottom>
    </Layout>
  );
};

export default Header;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  a {
    text-decoration: none;
    color: ${customColor.orange};
    margin: 0px, 10px;
  }
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
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
`;
const InputBox = styled.form`
  background-color: white;
  width: 240px;
  height: 32px;
  border-radius: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${customColor.whiteGray};
`;
const InlineInput = styled.input`
  width: 180px;
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
  position: relative;
  left: 10px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;
const LayoutBottom = styled.div`
  display: flex;
  justify-content: center;
  height: 64px;
  z-index: 999;
  border: 1px solid ${customColor.whiteGray};
  background-color: white;
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
  height: 63px;
  width: 1140px;
  border-bottom: 1px solid ${customColor.whiteGray};
  gap: 24px;
`;
