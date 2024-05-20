import React from 'react';
import styled from 'styled-components';
import { usePagenate } from '../hooks/pagenateHook/usePagenate';
import ArrowLeftIcon from '/public/postPageImages/keyboard_arrow_left.svg';
import ArrowRightIcon from '/public/postPageImages/keyboard_arrow_right.svg';

const Pagenate = ({ ...props }) => {
  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroupsNum,
  } = usePagenate({ apiData: props.data });

  const handleActive = (pageNum: number) => {
    return pageNum == currentPage;
  };

  return (
    <Container view={props.data?.totalElements}>
      {pageGroupsNum !== 0 && (
        <NextPageBtn onClick={() => handlePrevGroup()}>
          <ArrowLeftIcon width="6" height="10" />
        </NextPageBtn>
      )}
      {pages.map((pageNum) => (
        <PageNumBtn
          onClick={() => handlePageChange(pageNum)}
          active={handleActive(pageNum)}
          key={pageNum}
        >
          {pageNum}
        </PageNumBtn>
      ))}
      {pageGroupsNum !== lastPageGroup && (
        <NextPageBtn onClick={() => handleNextGroup()}>
          <ArrowRightIcon width="6" height="10" />
        </NextPageBtn>
      )}
    </Container>
  );
};

export default Pagenate;

const Container = styled.div<{ view: boolean }>`
  display: ${({ view }) => (view ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
`;
const NextPageBtn = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    display: none;
  }
  svg {
    color: ${({ theme }) => theme.brand};
  }
`;
const PageNumBtn = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  color: ${({ active, theme }) => (active ? '#fff' : theme.subText)};
  background-color: ${({ active, theme }) => active && theme.brand};
  border-radius: ${({ active }) => active && '32px'};
  border: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
