import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import timeDifference from "../utils/timeDifference";

/**
 * UserPostList에 필요한 postlist 데이터
 */
interface UserPostListType {
  data: any;
}
/**
 * id : 게시글 boardId
 * title : 게시글 제목
 * userName : 게시글 작성자 닉네임
 * views : 조회수
 * createTime : 작성 시간
 * commentNum : 댓글 수
 */
interface ItmePost {
  id: string;
  title: string;
  userName: string;
  views: number;
  createTime: string;
  commentNum: number;
}

const UserPostList = ({ data }: UserPostListType) => {
  // 페이지에 따른 게시글 번호 설정
  const router = useRouter();
  const { page } = router.query;
  const pageNum = parseInt(page as string, 10) || 1;

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
                      <span>{item.userName}</span>
                    </DivGap>
                    <DivGap>
                      <Image
                        src="/postPageImages/schedule.svg"
                        width="16"
                        height="16"
                        alt=""
                      />
                      <Time>{timeAgo}</Time>
                    </DivGap>
                    <ViewDiv>
                      <Image
                        src="/postPageImages/visibility.svg"
                        width="16"
                        height="16"
                        alt=""
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
    color: ${({ theme }) => theme.text};
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
  color: ${({ theme }) => theme.brand};
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.subText};
  span {
    font-size: 12px;
  }
`;
const Time = styled.span`
  display: flex;
  justify-content: center;
  width: 40px;
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
