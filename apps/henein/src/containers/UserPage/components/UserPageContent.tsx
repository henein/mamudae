import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import Content from './Content';
import ContentHeader from './ContentHeader';
import { useGetUserProfile } from '../../../hooks/userPageHooks/useUserProfile';

const UserPageContent = ({ ...props }) => {
  const { data } = useGetUserProfile(props.nickname);
  console.log(props.nickname);
  console.log(data);
  return (
    <Container>
      <UserProfile {...data} />
      <BoardContent>
        <ContentHeader
          boardCount={data?.boardCount}
          commentCount={data?.commentCount}
        />
        <Content {...props} {...data} />
      </BoardContent>
    </Container>
  );
};

export default UserPageContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  width: 100%;
`;
const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
