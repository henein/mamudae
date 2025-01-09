import React from 'react';
import styled from 'styled-components';
import Login from '../../component/LoginComponent/Login';
import UserPageContent from './components/UserPageContent';

const UserPage = ({ ...props }) => {
  return (
    <Layout>
      <Container>
        <Aside>
          <Login />
        </Aside>
        <UserPageContent {...props} />
      </Container>
    </Layout>
  );
};

export default UserPage;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  gap: 32px;
  height: 100%;
  margin: 0px auto;
  width: 100%;
  max-width: 1140px;
`;

const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
