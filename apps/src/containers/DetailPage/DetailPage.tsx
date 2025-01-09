import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Login from '../../component/LoginComponent/Login';
import { useDetail } from '../../hooks/detailPageHooks/useDetail';
import CommentBox from './components/CommentBox';
import OptionBox from './components/OptionBox';
import WriteBox from './components/WriteBox';

export type CommentType = {
  comment: string;
  id: number;
  modifiedDate: string;
  tag: string;
  writerId: number;
  replyId: number;
  uid: string;
  replies?: any;
};

const DetailPage = () => {
  const router = useRouter();
  const boardId = Number(router.query.id);

  const { data } = useDetail({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  return (
    <Container>
      <SideBox>
        <Login />
      </SideBox>
      <RightWrapper>
        <WriteBox data={data} boardId={boardId} />
        <OptionBox data={data} boardId={boardId} />
        <CommentBox data={data} boardId={boardId} />
      </RightWrapper>
    </Container>
  );
};

export default DetailPage;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0px auto;
  display: flex;
  gap: 32px;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
