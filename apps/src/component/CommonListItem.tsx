import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import timeDifference from '../utils/timeDifference';
import Visibility from '/public/detailPageImages/visibility.svg';
import Comment from '/public/detailPageImages/comment.svg';
import Favorite from '/public/detailPageImages/favoriteOutline.svg';
import Image from 'next/image';

const CommonListItem = ({ ...props }) => {
  const {
    id,
    boardType,
    title,
    text,
    userName,
    createTime,
    views,
    commentNum,
    recommendNum,
    fileUrl,
  } = props;
  return (
    <Container>
      <BoardInfo>
        <Infos>
          <Link href={`/board/${boardType}`}>
            <Type>{boardType}</Type>
          </Link>
          <Link href={`/board/${boardType}/${id}`}>
            <Title>{title}</Title>
          </Link>
          <Content>{text || '...'}</Content>
        </Infos>
        {fileUrl && <CustomImage src={fileUrl} alt="" width={64} height={64} />}
      </BoardInfo>
      <UserInfo>
        <Left>
          <Images />
          <Nickname>{userName}</Nickname>
          <Time>· {timeDifference(createTime)}</Time>
        </Left>
        <Right>
          <CountDiv>
            <Visibility />
            <span>{views}</span>
          </CountDiv>
          <CountDiv>
            <Comment />
            <span>{commentNum}</span>
          </CountDiv>
          <CountDiv>
            <Favorite />
            <span>{recommendNum}</span>
          </CountDiv>
        </Right>
      </UserInfo>
    </Container>
  );
};

export default CommonListItem;

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
const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const CustomImage = styled(Image)`
  background-color: black;
  border-radius: 8px;
  width: 64px;
  height: 64px;
  margin-left: 8px;
`;
