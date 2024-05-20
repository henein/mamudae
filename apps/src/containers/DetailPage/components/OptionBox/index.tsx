import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Button from '../../../../component/Button';

const OptionBox = ({ ...props }) => {
  const { data, boardId } = props;

  return (
    <Container>
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
          <Button type="button" sort="danger" onClick={() => {}}>
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
