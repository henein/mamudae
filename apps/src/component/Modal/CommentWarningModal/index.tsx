import React, { useMemo } from 'react';
import styled from 'styled-components';
import useCommentInfoState from '../../../../store/comment/commentInfo';
import useCommentWarningModalState from '../../../../store/modal/commentWarning';
import {
  useDelComment,
  useDelReComment,
} from '../../../hooks/detailPageHooks/useComment';
import Button from '../../Button';
import {
  Bottom,
  Container,
  Content,
  Phrases,
  WarningIconWrapper,
} from '../modalCommonStyle';
import PortalWrapper from '../Portal';
import WarningIcon from '/public/detailPageImages/warning.svg';

const CommentWarningModal = ({ type }: { type: 'modify' | 'delete' }) => {
  const { commentInfo } = useCommentInfoState();
  console.log(commentInfo);

  const { delComments } = useDelComment({
    boardId: commentInfo.boardId,
    commentId: commentInfo.commentId,
  });
  const { delReComments } = useDelReComment({
    boardId: commentInfo.boardId,
    replyId: commentInfo.replyId,
  });

  const { close } = useCommentWarningModalState();

  const submitData = async () => {
    if (type == 'delete') {
      commentInfo.isRecomment ? delReComments() : delComments();
    } else {
    }
  };

  const korean = useMemo(() => {
    return {
      modify: '수정',
      delete: '삭제',
    };
  }, []);

  return (
    <PortalWrapper>
      <Container>
        <Content>
          <WarningIconWrapper>
            <WarningIcon width="22px" height="19px" />
          </WarningIconWrapper>
          <Phrases>정말로 이 댓글을 {korean[type]} 하시겠습니까?</Phrases>
        </Content>
        <StyledBottom>
          <Button type="button" sort="secondary" onClick={close}>
            취소
          </Button>
          <Button type="submit" sort="danger" onClick={() => submitData()}>
            {korean[type]}하기
          </Button>
        </StyledBottom>
      </Container>
    </PortalWrapper>
  );
};

export default CommentWarningModal;

const StyledBottom = styled(Bottom)`
  width: 332px;
`;
