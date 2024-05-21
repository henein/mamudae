import React, { useMemo } from 'react';
import styled from 'styled-components';
import useBoardWarningModalState from '../../../store/modal/boardWarning';
import { useBoardDelete } from '../../hooks/detailPageHooks/useDetail';
import Button from '../Button';
import {
  Bottom,
  Container,
  Content,
  Phrases,
  WarningIconWrapper,
} from './modalCommonStyle';
import PortalWrapper from './Portal';
import WarningIcon from '/public/detailPageImages/warning.svg';

interface Props {
  type: 'modify' | 'delete';
  boardId: number;
}

const BoardWarningModal = ({ ...props }: Props) => {
  const { boardDelete } = useBoardDelete({ boardId: props.boardId });
  const { close } = useBoardWarningModalState();

  const submitData = async () => {
    if (props.type == 'delete') {
      boardDelete();
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
          <Phrases>
            정말로 이 게시글을 {korean[props.type]}하시겠습니까?
          </Phrases>
        </Content>
        <StyledBottom>
          <Button type="button" sort="secondary" onClick={close}>
            취소
          </Button>
          <Button type="submit" sort="danger" onClick={() => submitData()}>
            {korean[props.type]}하기
          </Button>
        </StyledBottom>
      </Container>
    </PortalWrapper>
  );
};

export default BoardWarningModal;

const StyledBottom = styled(Bottom)`
  width: 332px;
`;
