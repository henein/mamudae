import React from "react";
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

  const timeDifference = (previous: number) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;
    const currentTimestamp = new Date().getTime();

    const elapsed = currentTimestamp - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + "초 전";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + "분 전";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + "시간 전";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerDay) + "일 전";
    } else {
      return Math.round(elapsed / msPerYear) + "년 전";
    }
  };

  const { data, isLoading } = useEachPost(boardKey);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PostList>
        {data.content.map((item: any, idx: number) => {
          const createTime = item.createTime;
          const createTimeTimestamp = Date.parse(createTime);
          const timeAgo = timeDifference(createTimeTimestamp);
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
                    {/* <Tag type='floor'>48층</Tag> */}
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/postPageImages/schedule.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <Time>{timeAgo}</Time>
                  </DivGap>
                  <ViewDiv>
                    <Image
                      src='/postPageImages/visibility.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <Views>{item.views}</Views>
                  </ViewDiv>
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
  min-height: 36px;
  line-height: 16px;
  gap: 10.5px;
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
const Time = styled.span`
  display: flex;
  justify-content: center;
  width: 36px;
`;
const ViewDiv = styled.div`
  display: flex;
`;
const Views = styled.span`
  display: flex;
  justify-content: center;
  width: 27px;
`;
