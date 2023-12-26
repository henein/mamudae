import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { usePagenate } from "../hooks/pagenateHook/usePagenate";

const MoreInfoBox = ({ isRouterPaging, data, setPageNums, pageNums }: any) => {
  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroupsNum,
  } = usePagenate({ apiData: data });

  const handlePage = (isRouterPaging: boolean, pageNum: number) => {
    if (isRouterPaging) handlePageChange(pageNum);
    else setPageNums(pageNum);
  };
  const handleGroup = (isRouterPaging: boolean, isPrev: boolean) => {
    if (isPrev) isRouterPaging ? handlePrevGroup() : setPageNums();
    else isRouterPaging ? handleNextGroup() : setPageNums();
  };
  const handleActive = (isRouterPaging: boolean, pageNum: number) => {
    return isRouterPaging ? pageNum == currentPage : pageNum == pageNums;
  };

  return (
    <>
      <MoreInfo>
        {pageGroupsNum !== 0 && (
          <NextPageBtn onClick={() => handleGroup(isRouterPaging, true)}>
            <Image
              src="/postPageImages/keyboard_arrow_left.svg"
              width="6"
              height="10"
              alt=""
            />
          </NextPageBtn>
        )}
        {pages.map((pageNum) => (
          <PageNumBtn
            onClick={() => {
              handlePage(isRouterPaging, pageNum);
            }}
            active={handleActive(isRouterPaging, pageNum)}
            key={pageNum}
          >
            {pageNum}
          </PageNumBtn>
        ))}
        {pageGroupsNum !== lastPageGroup && (
          <NextPageBtn onClick={() => handleGroup(isRouterPaging, false)}>
            <Image
              src="/postPageImages/keyboard_arrow_right.svg"
              width="6"
              height="10"
              alt=""
            />
          </NextPageBtn>
        )}
      </MoreInfo>
    </>
  );
};

export default MoreInfoBox;

const MoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
  border-top: 1px solid ${({ theme }) => theme.border};
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
`;
const PageNumBtn = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  color: ${({ active, theme }) => (active ? "#fff" : theme.subText)};
  background-color: ${({ active, theme }) => active && theme.brand};
  border-radius: ${({ active }) => active && "32px"};
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
