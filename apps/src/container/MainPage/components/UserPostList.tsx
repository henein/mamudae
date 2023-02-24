import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import { useGetAllPost } from "../../../hooks/queries/boardPost";
import { BoardInfoType } from "../MainPage";

export type ItemType = {
  id: number;
  title: string;
  commentNum: number;
  name: string;
  createTime: string;
  views: number;
  recomment: number;
  text: string;
};

const UserPostList = ({ board_title }: BoardInfoType) => {
  const allPost = useGetAllPost();
  const data = allPost.map((item) => item.data);

  return (
    <PostList>
      {board_title == "전체"
        ? data[0].map((item: ItemType) => {
            return (
              <PostItem key={item.id}>
                <Link href={`detail/${item.id}`} key={item.id}>
                  <span>{item.text}</span>
                </Link>
                <NickName>{item.name}</NickName>
              </PostItem>
            );
          })
        : board_title == "자유"
        ? data[1].map((item: ItemType) => {
            return (
              <PostItem key={item.id}>
                <Link href={`detail/${item.id}`} key={item.id}>
                  <span>{item.text}</span>
                </Link>
                <NickName>{item.name}</NickName>
              </PostItem>
            );
          })
        : board_title == "유머"
        ? data[2].map((item: ItemType) => {
            return (
              <PostItem key={item.id}>
                <Link href={`detail/${item.id}`} key={item.id}>
                  <span>{item.text}</span>
                </Link>
                <NickName>{item.name}</NickName>
              </PostItem>
            );
          })
        : board_title == "보스"
        ? data[3].map((item: ItemType) => {
            return (
              <PostItem key={item.id}>
                <Link href={`detail/${item.id}`} key={item.id}>
                  <span>{item.text}</span>
                </Link>
                <NickName>{item.name}</NickName>
              </PostItem>
            );
          })
        : board_title == "직업" &&
          data[4].map((item: ItemType) => {
            return (
              <PostItem key={item.id}>
                <Link href={`detail/${item.id}`} key={item.id}>
                  <span>{item.text}</span>
                </Link>
                <NickName>{item.name}</NickName>
              </PostItem>
            );
          })}
    </PostList>
  );
};
export default UserPostList;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 30px;
  margin-top: 20px;
  font-size: 12px;
  a {
    color: ${customColor.black};
  }
`;
const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NickName = styled.span`
  color: ${customColor.darkGray};
`;
