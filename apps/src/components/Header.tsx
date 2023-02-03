import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Top>
      <InlineBox>
        <NavList>
          <Link href='/'>
            <Title>Henein</Title>
          </Link>
          <Link href='/'>홈</Link>
          <Link href='/'>더치트</Link>
        </NavList>
        <InputBox>
          <InlineInput></InlineInput>
          <SubmitBtn>
            <Image src='/search.svg' width='18' height='18' alt='search' />
          </SubmitBtn>
        </InputBox>
      </InlineBox>
    </Top>
  );
};

export default Header;

const Top = styled.div`
  background-color: #ff8038;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  a {
    text-decoration: none;
    color: white;
    margin: 0px, 10px;
  }
`;
const Title = styled.h1`
  font-family: Noto Sans KR;
  font-size: 32px;
  font-weight: 900;
  line-height: 46.34px;
`;
const InlineBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1140px;
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 25px;
  }
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
