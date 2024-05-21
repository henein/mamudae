import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import Content from '../components/Content';
import ContentHeader from '../components/ContentHeader';
import { useGetMyProfile } from '../../../hooks/userPageHooks/useUserProfile';

const UserPageContent = ({ ...props }) => {
  const { data } = useGetMyProfile();
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
`;
const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 808px;
`;
