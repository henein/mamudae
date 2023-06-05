import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcement from '../../component/AnnounceComponent/Announcement';
import CompleteLogin from '../../component/LoginComponent/CompleteLogin';
import Login from '../../component/LoginComponent/Login';
import { useGetComment } from '../../hooks/detailPageHooks/useComment';
import { useDetail } from '../../hooks/detailPageHooks/useDetail';
import { useLocalStorage } from '../../hooks/storage/useLocalStorage';
import { useUserInfo } from '../../hooks/user/useUserInfo';
import Comment from './components/Comment';
import Like from './components/Like';
import Title from './components/Title';
import Write from './components/Write';

export type CommentType = {
  comment: string;
  commentId: number;
  modifiedDate: string;
  userName: string;
  tag: string;
  replyId: string;
  replies?: any;
};

const DetailPage = () => {
  const router = useRouter();
  const boardId = router.query.id as string;
  const options = { enabled: false };
  // Hybrid Rendering
  const { title, text, recommend, views, createTime, userInfoResponseDto } =
    useDetail({
      boardId,
      options,
    });
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage('access');
  const [context, setContext] = useState('');
  const userData = useUserInfo({
    accessToken,
    options: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  }).data;
  const commentdata = useGetComment({ boardId }).data;

  useEffect(() => {
    const html = generateHTML(JSON.parse(text), [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: '내용을 입력해주세요...',
      }),
      Underline,
      Image,
    ]);

    setContext(html);
  }, [text]);

  console.log(commentdata);
  return (
    <Container>
      <Announcement />
      <SideBox>
        {userData ? <CompleteLogin {...userData} /> : <Login />}
      </SideBox>
      <div>
        <WriteBox>
          <Wrapper>
            <Title
              title={title}
              name={userInfoResponseDto.userName}
              views={views}
              createTime={createTime}
            />
            <Content dangerouslySetInnerHTML={{ __html: context }} />
            <Like recommend={recommend} boardId={boardId} />
          </Wrapper>
        </WriteBox>

        <CommentBox>
          <Write boardId={boardId} userData={userData} />
          <Comments>
            {commentdata &&
              commentdata.map((item: CommentType, idx: number) => {
                return (
                  <Comment
                    comment={item.comment}
                    userName={item.userName}
                    modifiedDate={item.modifiedDate}
                    replies={item.replies}
                    key={idx}
                    commentId={item.commentId}
                    boardId={boardId}
                    userData={userData}
                    isLastComment={idx + 1 == commentdata.length}
                  />
                );
              })}
          </Comments>
        </CommentBox>
      </div>
    </Container>
  );
};

export default DetailPage;

const Comments = styled.div`
  padding: 20px 24px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% + 21px);
  position: relative;
`;
const Content = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 400;
  padding: 0 24px;
  line-height: 18px;
  color: ${(prop) => prop.theme.Text};
`;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: ${(prop) => prop.theme.card};
  width: 808px;
  border-radius: 16px;
  ::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid ${(prop) => prop.theme.border};
`;
const WriteBox = styled.div`
  border-radius: 16px;
  background-color: ${(prop) => prop.theme.card};
  border: 1px solid ${(prop) => prop.theme.border};
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  width: 808px;
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
