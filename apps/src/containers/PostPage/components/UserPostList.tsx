import React, { useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEachPost } from "../../../hooks/postPageHooks/usePostPage";

const UserPostList = () => {
  const router = useRouter();
  const title: { [key: string]: string } = {
    전체: "entireboard",
    자유: "F",
    유머: "H",
    보스: "B",
    직업: "I",
  };
  const boardTitle = router.query.post as string;
  const boardKey = title[boardTitle];

  const { data, isLoading } = useEachPost(boardKey);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PostList>
        {data.content.map((item: any, idx: number) => {
          return (
            <Link
              href={{
                pathname: `/board/${router.query.post}/${item.id}`,
              }}
              key={idx}
            >
              <PostItem>
                <LeftSide>
                  <PostNum>{item.id}</PostNum>
                  <DivGap>
                    <span>{item.title}</span>
                    <CommentNum>{`[${item.commentNum}]`}</CommentNum>
                  </DivGap>
                </LeftSide>
                <RightSide>
                  <DivGap>
                    <span>{item.name}</span>
                    <Rank>{item.rank == undefined ? "48층" : item.rank}</Rank>
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/postPageImages/schedule.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <span>{item.createTime}</span>
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/postPageImages/visibility.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <span>{item.views}</span>
                  </DivGap>
                </RightSide>
              </PostItem>
            </Link>
          );
        })}
      </PostList>
    </>
  );
};

export default UserPostList;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px;
  margin-top: 12px;
  margin-bottom: 12px;
  a {
    color: ${customColor.black};
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
`;
const LeftSide = styled.div`
  display: flex;
  gap: 12px;
  span {
    font-size: 12px;
  }
`;
const DivGap = styled.div`
  display: flex;
  gap: 4px;
`;
const PostNum = styled.span`
  width: 43px;
`;
const CommentNum = styled.span`
  color: ${customColor.orange};
`;
const RightSide = styled.div`
  display: flex;
  gap: 12px;
  color: ${customColor.darkGray};
  span {
    font-size: 12px;
  }
`;
const Rank = styled.div`
  display: flex;
  justify-content: center;
  color: ${customColor.white};
  background-color: ${customColor.floor};
  border-radius: 8px;
  width: 30px;
  height: 16px;
  font-size: 10px;
`;
