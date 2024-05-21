import Link from 'next/link';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import useBoardWarningModalState from '../../../../../store/modal/boardWarning';
import Button from '../../../../component/Button';
import BoardWarningModal from '../../../../component/Modal/BoardWarningModal';

const OptionBox = ({ ...props }) => {
  const { data, boardId } = props;
  const {
    boardWarningOnModal,
    open: warningOpen,
    getType,
  } = useBoardWarningModalState();

  const type = useMemo(() => {
    return getType();
  }, [boardWarningOnModal]);

  return (
    <Container>
      {type && <BoardWarningModal type={type} boardId={boardId} />}
      <Button type="button" sort="secondary">
        목록
      </Button>
      {data && data.uid ? (
        <RightItems>
          <Link href={`/update/${boardId}`}>
            <Button type="button" sort="secondary">
              수정하기
            </Button>
          </Link>
          <Button
            type="button"
            sort="danger"
            onClick={() => warningOpen('delete')}
          >
            삭제하기
          </Button>
        </RightItems>
      ) : (
        <RightItems>
          <Button type="button" sort="danger" onClick={() => {}}>
            신고하기
          </Button>
        </RightItems>
      )}
    </Container>
  );
};

export default OptionBox;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;
const RightItems = styled.div`
  display: flex;
  gap: 8px;
`;
