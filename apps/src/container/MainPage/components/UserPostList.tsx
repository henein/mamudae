import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import dummy from "../../../dummy/dummy.json";
import { customColor } from "../../../constants/customColor";
import axios from "axios";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQueries } from "react-query";

export type propsInfoType = {
  id: number;
  title: string;
  commentNum: number;
  name: string;
  createTime: string;
  views: number;
  recomment: number;
  text: string;
};

const UserPostList = () => {
  const res = useQueries([
    {
      queryKey: "freeInfo",
      queryFn: getFreeInfo,
    },
    {
      queryKey: "freeInfo",
      queryFn: getFreeInfo,
    },
  ]);

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

const getFreeInfo = async () => {
  const apiurl = `http://henesysback.shop:8081/board/free/`;
  const getApi = await axios.get(apiurl);
  const item = getApi.data;
  return item;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("freeInfo", getFreeInfo);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
