import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEachPost } from "../../../hooks/postPageHooks/usePostPage";
import Label from "../../../component/Label";
import timeDifference from "../../../utils/timeDifference";
const UserPostList = () => {
  const router = useRouter();
  const { page } = router.query;
  const pageNum = parseInt(page as string, 10) || 1;

  const { data } = useEachPost();

  type ItmePost = {
    id: string;
    title: string;
    name: string;
    rank?: string;
    views: number;
    createTime: string;
    commentNum: number;
  };
  return (
    <>
      <PostList>
        {data &&
          data.content.map((item: ItmePost, idx: number) => {
            const timeAgo = timeDifference(item.createTime);
            return (
              <Link
                href={{
                  pathname: `/board/${router.query.post}/${item.id}`,
                }}
                key={idx}
              >
                <PostItem>
                  <LeftSide>
                    <PostNum>
                      {`000000${
                        data && data.totalElements - idx * pageNum
                      }`.slice(-6)}
                    </PostNum>
                    <DivGap>
                      <span>{item.title}</span>
                      <CommentNum>{`[${item.commentNum}]`}</CommentNum>
                    </DivGap>
                  </LeftSide>
                  <RightSide>
                    <DivGap>
                      <span>{item.name}</span>
                      <Label type='floor'>
                        {item.rank == undefined ? "48층" : item.rank}
                      </Label>
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
  gap: 10px;
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
  align-items: center;
`;
const PostNum = styled.span`
  width: 43px;
`;
const CommentNum = styled.span`
  color: ${customColor.orange};
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${customColor.darkGray};
  span {
    font-size: 12px;
  }
`;
const Time = styled.span`
  display: flex;
  justify-content: center;
  width: 38px;
`;
const ViewDiv = styled.div`
  display: flex;
`;
const Views = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
`;
