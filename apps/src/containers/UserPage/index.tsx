import React, { useEffect } from 'react';
import styled from 'styled-components';
import Announcement from '../../component/AnnounceComponent/Announcement';
import Login from '../../component/LoginComponent/Login';
import UserPageContent from './components/UserPageContent';
import useUserPageQueryStore from '../../../store/userPageQuerySlice';

const UserPage = ({ ...props }) => {
  const { nickname, page } = props;
  const { setQueries } = useUserPageQueryStore();

  useEffect(() => {
    setQueries({ nickname: nickname, page: page });
  }, [nickname, page]);

  return (
    <Layout>
      <Announcement />
      <Container>
        <Aside>
          <Login />
        </Aside>
        <UserPageContent />
      </Container>
    </Layout>
  );
};

export default UserPage;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 1140px;
  margin: 0 auto;
  box-sizing: border-box;
`;
const Container = styled.div`
  display: flex;
  gap: 32px;
`;

const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
