import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../constants/customColor";
import { useRouter } from "next/router";

const MoreInfoBox = ({ pageType, data, refetch }: any) => {
  const router = useRouter();
  const pageNum = parseInt(router.query.page as string) || 1;
  const [pageNums, setPageNums] = useState(1);

  const totalPages = data && data.totalPages;

  // 페이지 숫자 버튼 클릭시 라우팅
  const handlePageNumClick = (pageNum: number) => {
    if (pageType == "postPage")
      router.push(`${router.query.post}/?page=${pageNum}`);
    else setPageNums(pageNum);
    refetch();
  };

  // < 버튼 클릭 시 10 페이지 감소
  const handlePrevPageBtnClick = () => {
    if (pageType == "postPage")
      router.push(`${router.query.post}/?page=${pageNum - 10}`);
    else setPageNums((prevPageNum) => Math.max(prevPageNum - 10, 1));
    refetch();
  };

  // > 버튼 클릭 시 10 페이지 증가
  const handleNextPageBtnClick = () => {
    if (pageType == "postPage")
      router.push(`${router.query.post}/?page=${pageNum + 10}`);
    else setPageNums((prevPageNum) => Math.max(prevPageNum + 10, 1));
    refetch();
  };

  const getPageNums = () => {
    if (pageType == "postPage") {
      const pageNumArr: number[] = [];
      const startNum: number = Math.floor((pageNum - 1) / 10) * 10 + 1; // pageGroup역할을 함
      const endNum: number = Math.min(startNum + 9, totalPages);
      for (let i = startNum; i <= endNum; i++) {
        pageNumArr.push(i);
      }
      return pageNumArr;
    } else {
      const pageNumArr = [];
      const startNum = Math.floor((pageNums - 1) / 10) * 10 + 1;
      const endNum = Math.min(startNum + 9, totalPages);
      for (let i = startNum; i <= endNum; i++) {
        pageNumArr.push(i);
      }
      return pageNumArr;
    }
  };
  return (
    <>
      <MoreInfo>
        <NextPageBtn
          onClick={handlePrevPageBtnClick}
          disabled={
            pageType == "postPage"
              ? 0 < pageNum && pageNum < 11
              : 0 < pageNums && pageNums < 11
          }
        >
          <Image
            src="/postPageImages/keyboard_arrow_left.svg"
            width="6"
            height="10"
            alt=""
          />
        </NextPageBtn>

        {getPageNums().map((num) => (
          <PageNumBtn
            key={num}
            onClick={() => handlePageNumClick(num)}
            active={pageType == "postPage" ? pageNum === num : pageNums === num}
          >
            {num}
          </PageNumBtn>
        ))}

        <NextPageBtn
          onClick={handleNextPageBtnClick}
          disabled={
            pageType == "postPage"
              ? pageNum + 9 >= totalPages
              : pageNums + 9 >= totalPages
          }
        >
          <Image
            src="/postPageImages/keyboard_arrow_right.svg"
            width="6"
            height="10"
            alt=""
          />
        </NextPageBtn>
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
