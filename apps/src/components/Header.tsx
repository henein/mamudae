import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Top>
      <div className='inlineBox'>
        <div className='list'>
          <Link href='/'>
            <h1>Henein</h1>
          </Link>
          <Link href='/'>홈</Link>
          <Link href='#'>더치트</Link>
        </div>
        <form className='inputBox'>
          <input></input>
          <button type='submit'>
            <Image src='/search.svg' width='18' height='18' alt='search' />
          </button>
        </form>
      </div>
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
  h1 {
    font-family: Noto Sans KR;
    font-size: 32px;
    font-weight: 900;
    line-height: 46.34px;
  }
  a {
    text-decoration: none;
    color: white;
    margin: 0px, 10px;
  }
  .inlineBox {
    display: flex;
    justify-content: space-between;
    width: 1140px;
  }
  .list {
    display: flex;
    align-items: center;
    a {
      margin-right: 25px;
    }
  }
  .inputBox {
    background-color: white;
    width: 240px;
    height: 32px;
    border-radius: 40px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 180px;
      height: 30px;
      border: none;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
    }
    button {
      width: 24px;
      height: 24px;
      padding: 2px;
      margin: 0;
      border: 0;
      position: relative;
      left: 10px;
      background-color: white;
    }
    button:hover {
      cursor: pointer;
    }
  }
`;
