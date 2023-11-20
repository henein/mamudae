import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../constants/customColor";
import { usePagenate } from "../hooks/pagenateHook/usePagenate";

const MoreInfoBox = ({ isRouterPaging, data, setPageNums, pageNums }: any) => {
  const {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroups,
  } = usePagenate({ apiData: data });

  const handlePage = (isRouterPaging: boolean, pageNum: number) => {
    if (isRouterPaging) handlePageChange(pageNum);
    else setPageNums(pageNum);
  };
  const handleGroup = (isRouterPaging: boolean, isPrev: boolean) => {
    if (isPrev) isRouterPaging ? handlePrevGroup(pageGroups) : setPageNums();
    else isRouterPaging ? handleNextGroup(pageGroups) : setPageNums();
  };
  const handleActive = (isRouterPaging: boolean, pageNum: number) => {
    return isRouterPaging ? pageNum == currentPage : pageNum == pageNums;
  };

  return (
    <>
      <MoreInfo>
        {pageGroups !== 0 && (
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
        {pageGroups !== lastPageGroup && (
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
  color: ${(props) =>
    props.active ? customColor.white : customColor.darkGray};
  background-color: ${(props) =>
    props.active ? props.theme.brand : customColor.white};
  border-radius: ${(props) => props.active && "32px"};
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
