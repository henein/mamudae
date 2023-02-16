import Link from "next/link";
import React from "react";
import styled from "styled-components";
import dummy from "../../../dummy/dummy.json";
import { customColor } from "../../../constants/customColor";

const UserPostList = () => {
  return (
    <PostList>
      {dummy.userpost.map((item) => {
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
    color: black;
  }
`;
const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NickName = styled.span`
  color: ${customColor.darkGray};
`;
