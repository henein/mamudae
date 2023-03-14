import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import { useRouter } from "next/router";
import { useEachPost } from "../../../hooks/postPageHooks/usePostPage";

const MoreInfoBox = () => {
  const router = useRouter();
  const pageNum = parseInt(router.query.page as string) || 1;
  const totalPages = 38; // 백엔드에서 받을때 이부분을 totalpages.length 느낌으로 받으면됨
  const { refetch } = useEachPost();

  const handlePageNumClick = (pageNum: number) => {
    router.push(`${router.query.post}/?page=${pageNum}`);
    refetch();
  };

  const handlePrevPageBtnClick = () => {
    router.push(`${router.query.post}/?page=${pageNum - 10}`);
    refetch();
  };

  const handleNextPageBtnClick = () => {
    router.push(`${router.query.post}/?page=${pageNum + 10}`);
    refetch();
  };
  // 아래의 함수는 나중에 SSR로 처리
  const getPageNums = () => {
    const pageNums: number[] = [];
    const startNum: number = Math.floor((pageNum - 1) / 10) * 10 + 1; // pageGroup역할을 함
    const endNum: number = Math.min(startNum + 9, totalPages);
    for (let i = startNum; i <= endNum; i++) {
      pageNums.push(i);
    }
    return pageNums;
  };
  return (
    <>
      <MoreInfo>
        <NextPageBtn
          onClick={handlePrevPageBtnClick}
          disabled={0 < pageNum && pageNum < 11}
        >
          <Image
            src='/postPageImages/keyboard_arrow_left.svg'
            width='6'
            height='10'
            alt=''
          />
        </NextPageBtn>

        {getPageNums().map((num) => (
          <PageNumBtn
            key={num}
            onClick={() => handlePageNumClick(num)}
            active={pageNum === num}
          >
            {num}
          </PageNumBtn>
        ))}

        <NextPageBtn
          onClick={handleNextPageBtnClick}
          disabled={pageNum + 9 >= totalPages}
        >
          <Image
            src='/postPageImages/keyboard_arrow_right.svg'
            width='6'
            height='10'
            alt=''
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
  border-top: 1px solid ${customColor.whiteGray};
`;

const NextPageBtn = styled.button`
  width: 32px;
  height: 32px;
  background-color: ${customColor.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    display: none;
  }
`;

interface PageNumBtnProps {
  active: boolean;
}

const PageNumBtn = styled.button<PageNumBtnProps>`
  width: 32px;
  height: 32px;
  color: ${(props) =>
    props.active ? customColor.white : customColor.darkGray};
  background-color: ${(props) =>
    props.active ? customColor.orange : customColor.white};
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
