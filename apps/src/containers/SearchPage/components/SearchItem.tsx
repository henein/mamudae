import Image from 'next/image';
import React from 'react';
import styled, { css } from 'styled-components';
import Visibility from '/public/detailPageImages/visibility.svg';
import Comment from '/public/detailPageImages/Comment.svg';
import Favorite from '/public/detailPageImages/favoriteOutline.svg';
import timeDifference from '../../../utils/timeDifference';
import Link from 'next/link';

const SearchItem = ({ ...props }) => {
  return (
    <Container>
      <BoardInfo>
        <Link href={`/board/${props.boardType}`}>
          <Type>{props.boardType}</Type>
        </Link>
        <Link href={`/board/${props.boardType}/${props.id}`}>
          <Title>{props.title}</Title>
        </Link>
        <Content>
          {props.content || '컨텐츠 없음 - 컨텐츠 api에서 속성 추가 필요함'}
        </Content>
      </BoardInfo>
      <UserInfo>
        <Left>
          <Images />
          <Nickname>{props.userName}</Nickname>
          <Time>· {timeDifference(props.createTime)}</Time>
        </Left>
        <Right>
          <CountDiv>
            <Visibility />
            <span>{props.views}</span>
          </CountDiv>
          <CountDiv>
            <Comment />
            <span>{props.commentNum}</span>
          </CountDiv>
          <CountDiv>
            <Favorite />
            <span>{props.recommendNum}</span>
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
  color: ${({ theme }) => theme.subText};
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
