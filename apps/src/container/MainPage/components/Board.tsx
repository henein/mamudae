import React from "react";
import styled from "styled-components";
import dummy from "../../../../dummy/dummy.json";

type CardInfoType = {
  board_title: "전체" | "자유" | "유머" | "보스" | "직업";
  isLarge: boolean;
};

const Board = ({ board_title, isLarge }: CardInfoType) => {
  return (
    <Layout isLarge={isLarge}>
      <div className='boardContent'>
        <div className='boardTit'>
          <h3>
            {board_title}
            {" >"}
          </h3>
        </div>
        <div className='postList'>
          {dummy.userpost.map((item) => {
            return (
              <PostItem key={item.id}>
                <span>{item.text}</span>
                <span className='nickname'>{item.name}</span>
              </PostItem>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default Board;

const Layout = styled.div<{ isLarge: boolean }>`
  background-color: white;
  box-sizing: border-box;
  .boardContent {
    border: 1px solid #e6e6e6;
    border-top: none;
    border-radius: 32px;
    width: ${(props) => (props.isLarge ? "816px" : "396px")};
    height: 332px;
    gap: 24px;
    box-sizing: border-box;
    z-index: 0.5;
  }
  .boardTit {
    display: flex;
    align-items: center;
    background-color: white;
    height: 60px;
    border-radius: 32px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    z-index: 1;
    box-shadow: 0 2px 3px rgba(255, 128, 56, 0.2);
    h3 {
      color: #ff8038;
      font-weight: bold;
      margin-left: 30px;
      font-size: 18px;
    }
  }
  .postList {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 30px;
    margin-top: 20px;
    span {
      font-size: 12px;
    }
    span.nickname {
      color: #757575;
    }
  }
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
