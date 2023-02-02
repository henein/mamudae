import React from "react";
import styled from "styled-components";
import dummy from "../../../dummy/dummy.json";
import Login from "../../components/Login";
import Image from "next/image";
import { useRouter } from "next/router";
import { customColor } from "../../constants/customColor";

const PostPage = () => {
  const router = useRouter();
  console.log(router.query.post);

  return (
    <Layout>
      <BoardContent>
        <BoardTit>
          <TitleText>{router.query.post}</TitleText>
          <ImageMargin>
            <Image src='/edit_square.svg' width='20' height='20' alt='' />
          </ImageMargin>
        </BoardTit>
        <PostList>
          {dummy.userpost2.map((item) => {
            return (
              <PostItem key={item.postnumber}>
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
                    <Image src='/schedule.svg' width='16' height='16' alt='' />
                    <span>{item.time}</span>
                  </DivGap>
                  <DivGap>
                    <Image
                      src='/visibility.svg'
                      width='16'
                      height='16'
                      alt=''
                    />
                    <span>{item.view}</span>
                  </DivGap>
                </RightSide>
              </PostItem>
            );
          })}
        </PostList>
        <MoreInfo>
          <ExpandBtn>
            <Image src='/expand_more.svg' width='12' height='7' alt='' />
          </ExpandBtn>
        </MoreInfo>
      </BoardContent>
      <Aside>
        <Login />
      </Aside>
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
`;
const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  border-top: none;
  border-radius: 32px;
  width: 808px;
  height: 872px;
  box-sizing: border-box;
  z-index: 0.5;
`;
const BoardTit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 64px;
  border-radius: 32px;
  border: 1px solid #e6e6e6;
  z-index: 1;
  box-shadow: 0 2px 3px rgba(255, 128, 56, 0.2);
`;
const TitleText = styled.h3`
  color: ${customColor.orange};
  font-weight: bold;
  margin-left: 24px;
  font-size: 18px;
`;
const ImageMargin = styled.div`
  margin-right: 24px;
`;
const PostList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 24px;
  margin-top: 12px;
  margin-bottom: 12px;
`;
const MoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
  border-top: 1px solid #e6e6e6;
`;
const ExpandBtn = styled.button`
  width: 24px;
  height: 24px;
  background-color: white;
  border: none;
  button:hover {
    cursor: pointer;
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
  color: white;
  background-color: #4b79ef;
  border-radius: 8px;
  width: 30px;
  height: 16px;
  font-size: 10px;
`;
const Aside = styled.aside`
  display: flex;
  width: 300px;
  background-color: white;
`;
