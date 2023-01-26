import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import dummy from "../../../db/dummy.json";
import Login from "../../components/Login";
import Image from "next/image";
import { customColor } from "../../constants/customColor";
import edit_square from "../../../assets/edit_square.svg";
import schedule from "../../../assets/schedule.svg";
import visibility from "../../../assets/visibility.svg";
import expand_more from "../../../assets/expand_more.svg";

const PostPage = () => {
  const router = useRouter();
  console.log(router.query.post);

  return (
    <Layout>
      <div className='boardContent'>
        <div className='boardTit'>
          <div>
            <h3>{router.query.post}</h3>
          </div>
          <div>
            <Image src={edit_square} width='20' height='20' alt='' />
          </div>
        </div>
        <div className='postList'>
          {dummy.userpost2.map((item) => {
            return (
              <PostItem key={item.postnumber}>
                <div className='leftside'>
                  <span className='postnum'>{item.postnumber}</span>
                  <div>
                    <span>{item.title}</span>
                    <span className='comment'>{`[${item.comment}]`}</span>
                  </div>
                </div>
                <div className='rightside'>
                  <div>
                    <span className='nickname'>{item.nickname}</span>
                    <span className='rank'>{item.rank}</span>
                  </div>
                  <div className='setting'>
                    <Image src={schedule} width='16' height='16' alt='' />
                    <span>{item.time}</span>
                  </div>
                  <div className='setting'>
                    <Image src={visibility} width='16' height='16' alt='' />
                    <span>{item.view}</span>
                  </div>
                </div>
              </PostItem>
            );
          })}
        </div>
        <div className='moreinfo'>
          <button>
            <Image src={expand_more} width='12' height='7.4' alt='' />
          </button>
        </div>
      </div>
      <div className='aside'>
        <Login />
      </div>
    </Layout>
  );
};

export default PostPage;

const Layout = styled.div`
  font-family: "Inter";
  font-style: normal;
  display: flex;
  justify-content: space-between;
  width: 1140px;
  margin: 0 auto;
  background-color: white;
  box-sizing: border-box;
  .boardContent {
    display: flex;
    flex-direction: column;
    border: 1px solid #e6e6e6;
    border-top: none;
    border-radius: 32px;
    width: 808px;
    height: 872px;
    box-sizing: border-box;
    z-index: 0.5;
    .moreinfo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 24px;
      height: 64px;
      border-top: 1px solid #e6e6e6;
      button {
        width: 24px;
        height: 24px;
        background-color: white;
        border: none;
      }
      button:hover {
        cursor: pointer;
      }
    }
    .boardTit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      height: 64px;
      border-radius: 32px;
      border: 1px solid #e6e6e6;
      z-index: 1;
      box-shadow: 0 2px 3px rgba(255, 128, 56, 0.2);
      h3 {
        color: ${customColor.orange};
        font-weight: bold;
        margin-left: 24px;
        font-size: 18px;
      }
      img {
        margin-right: 24px;
      }
    }
    .postList {
      display: flex;
      flex-direction: column;
      margin: 0 24px;
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }

  .aside {
    display: flex;
    width: 300px;
    background-color: white;
  }
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 760px;
  height: 36px;
  line-height: 16px;
  gap: 10.5;
  span {
    font-size: 12px;
  }
  div.leftside {
    display: flex;
    gap: 12px;
    .postnum {
      width: 43px;
    }
    div {
      display: flex;
      gap: 4px;
    }
    .comment {
      color: ${customColor.orange};
    }
  }
  div.rightside {
    display: flex;
    gap: 12px;
    color: ${customColor.darkGray};
    div {
      display: flex;
      gap: 4px;
    }
    .rank {
      display: flex;
      justify-content: center;
      color: white;
      background-color: #4b79ef;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 400px;
      width: 30px;
      height: 16px;
    }
    .setting {
      display: flex;
      justify-content: center;
    }
  }
`;
