import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import Content from '../components/Content';
import ContentHeader from '../components/ContentHeader';

const UserPageContent = () => {
  return (
    <Container>
      <UserProfile />
      <BoardContent>
        <ContentHeader />
        <Content />
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
