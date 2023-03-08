import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetAllPost } from "../../../hooks/mainPageHooks/useGetAllPost";

const UserPostList = () => {
  const router = useRouter();

  const data = useGetAllPost().map((item) => item.data.content);

  return (
    <>
      <PostList>
        {router.query.post == "전체"
          ? data[0].map((item: any, idx: number) => {
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
                        <Rank>
                          {item.rank == undefined ? "48층" : item.rank}
                        </Rank>
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
            })
          : router.query.post == "자유"
          ? data[1].map((item: any, idx: number) => {
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
                        <Rank>
                          {item.rank == undefined ? "48층" : item.rank}
                        </Rank>
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
            })
          : router.query.post == "유머"
          ? data[2].map((item: any, idx: number) => {
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
                        <Rank>
                          {item.rank == undefined ? "48층" : item.rank}
                        </Rank>
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
            })
          : router.query.post == "보스"
          ? data[3].map((item: any, idx: number) => {
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
                        <Rank>
                          {item.rank == undefined ? "48층" : item.rank}
                        </Rank>
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
            })
          : router.query.post == "직업" &&
            data[4].map((item: any, idx: number) => {
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
                        <Rank>
                          {item.rank == undefined ? "48층" : item.rank}
                        </Rank>
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
