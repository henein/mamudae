import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import Visibility from "/public/detailPageImages/visibility.svg";
import Comment from "/public/detailPageImages/Comment.svg";
import Favorite from "/public/detailPageImages/favoriteOutline.svg";

const SearchItem = () => {
  return (
    <Container>
      <BoardInfo>
        <Type>자유</Type>
        <Title>배틀메이지 코강 어떻게 해야 하나요?</Title>
        <Content>
          이번에 하이퍼버닝으로 시작한 뉴비인데 코강 어떻게 하는거예요? 이번에
          하이퍼버닝으로 시작한 뉴비인데 코강 어떻게 하는거예요?
        </Content>
      </BoardInfo>
      <UserInfo>
        <Left>
          <Images />
          <Nickname>Pdom</Nickname>
          <Time>· 3일 전</Time>
        </Left>
        <Right>
          <CountDiv>
            <Visibility />
            <span>104</span>
          </CountDiv>
          <CountDiv>
            <Comment />
            <span>12</span>
          </CountDiv>
          <CountDiv>
            <Favorite />
            <span>5</span>
          </CountDiv>
        </Right>
      </UserInfo>
    </Container>
  );
};

export default SearchItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.subText};
`;
const BoardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 64px;
`;
const Type = styled.span`
  font-size: 12px;
  font-weight: 400;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
`;
const Content = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 400;
  align-items: center;
`;
const Images = styled.div`
  background-color: black;
  border-radius: 100%;
  width: 24px;
  height: 24px;
`;
const Nickname = styled.span`
  margin: 0px 4px 0px 8px;
`;
const Time = styled.span``;
const Right = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const CountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  color: ${({ theme }) => theme.subText};
  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.subText};
  }
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;
