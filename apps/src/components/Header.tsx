import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

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
        <div className='inputBox'>
          <input></input>
          <AiOutlineSearch size='21' />
        </div>
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
    font-size: 30px;
    font-weight: bold;
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
    width: 230px;
    height: 30px;
    border-radius: 40px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 180px;
      height: 30px;
      border: none;
      position: relative;
      left: 5px;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
    }
    svg {
      display: block;
      color: #ff8038;
      font-weight: bold;
      border-radius: 40px;
      position: relative;
      left: 5px;
    }
  }
`;
