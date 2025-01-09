import React from 'react';
import styled from 'styled-components';
import Write from './Write';
import Comment from './Comment';
import { useGetComment } from '../../../../hooks/detailPageHooks/useComment';
import { CommentType } from '../../DetailPage';

const CommentBox = ({ ...props }) => {
  const { boardId, data } = props;
  const commentdata = useGetComment({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  }).data;

  return (
    <Container>
      {data && <Write boardId={boardId} totalComment={data.commentNum} />}
      <Comments>
        {commentdata &&
          commentdata.commentList.map((item: CommentType, idx: number) => {
            return (
              <Comment
                writerList={commentdata.writerList}
                comment={item.comment}
                nickName={
                  item.writerId === null
                    ? '알 수 없음'
                    : commentdata.writerList[item.writerId].nickName
                }
                modifiedDate={item.modifiedDate}
                replies={item.replies}
                key={idx}
                id={item.id}
                boardId={boardId}
                uid={
                  item.writerId === null
                    ? null
                    : commentdata.writerList[item.writerId].uid
                }
                role={
                  item.writerId === null
                    ? null
                    : commentdata.writerList[item.writerId].role
                }
                isLastComment={idx + 1 == commentdata.commentList.length}
              />
            );
          })}
      </Comments>
    </Container>
  );
};

export default CommentBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  background-color: ${(prop) => prop.theme.card};
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${(prop) => prop.theme.border};
`;
const Comments = styled.div`
  padding: 20px 24px;
`;
