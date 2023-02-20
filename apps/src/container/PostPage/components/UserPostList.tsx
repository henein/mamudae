import React from "react";
import styled from "styled-components";
import Image from "next/image";
import dummy from "../../../dummy/dummy.json";
import { customColor } from "../../../constants/customColor";
import Link from "next/link";
import { useRouter } from "next/router";

const UserPostList = () => {
  // const router = useRouter();
  // console.log(router.query);

  return (
    <>
      <PostList>
        {dummy.userpost2.map((item) => {
          return (
            <Link
              href={{
                pathname: `/detail/${item.postnumber}`,
              }}
              key={item.postnumber}
            >
              <PostItem>
                <LeftSide>
                  <PostNum>{item.postnumber}</PostNum>
                  <DivGap>
                    <span>{item.title}</span>
                    <CommentNum>{`[${item.comment}]`}</CommentNum>
                  </DivGap>
                </LeftSide>
                <RightSide>
                  <DivGap>
                    <span>{item.nickname}</span>
                    <Rank>{item.rank}</Rank>
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/postPageImages/schedule.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <span>{item.time}</span>
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/postPageImages/visibility.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <span>{item.view}</span>
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
  background-color: ${customColor.tagBlue};
  border-radius: 8px;
  width: 30px;
  height: 16px;
  font-size: 10px;
`;
