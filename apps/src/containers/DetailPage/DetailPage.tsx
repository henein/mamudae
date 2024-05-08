import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Announcement from '../../component/AnnounceComponent/Announcement';
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
  replyId: string;
  uid: string;
  replies?: any;
};

const DetailPage = () => {
  const router = useRouter();
  const boardId = router.query.id as string;

  const { data } = useDetail({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  return (
    <Container>
      <Announcement />
      <SideBox>
        <Login />
      </SideBox>
      <div>
        <WriteBox data={data} boardId={boardId} />
        <OptionBox data={data} boardId={boardId} />
        <CommentBox data={data} boardId={boardId} />
      </div>
    </Container>
  );
};

export default DetailPage;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
