import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface PagingContent {
  apiData: {
    totalElement: number;
    lastPage: boolean;
    totalPages: number;
    content: any[];
    empty: false;
    first: true;
    last: false;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
  };
}
export const usePagenate = ({ ...props }: PagingContent) => {
  const router = useRouter();

  const page = Number(router.query.page) || 1;

  // currentPage 로직 : 현재 페이지를 page쿼리로 받아옴 -> ui 컨트롤에 사용
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // 페이지 이동하는 로직
  const handlePageChange = (pageNum: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pageNum || 1,
      },
    });
  };

  // 페이지 컨트롤 로직 : api 데이터를 통해 페이징 할수있는 2차원 배열을 생성
  const pageGroups = Number(router.query.pageGroups) || 0;

  const [pageArr, setPageArr] = useState<number[]>([]);
  useEffect(() => {
    if (props.apiData) {
      let newarr = [];
      for (let i = 1; i < props.apiData.totalPages + 1; i++) {
        newarr.push(i);
      }
      setPageArr(newarr);
    }
  }, [props.apiData]);

  const [pageGroup, setPageGroup] = useState<Array<number[]>>([]);
  useEffect(() => {
    const pageGroup = [];
    for (let i = 0; i < pageArr.length; i += 10) {
      pageGroup.push(pageArr.slice(i, i + 10));
    }
    setPageGroup(pageGroup);
  }, [pageArr]);
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    let newpages: number[] = [];
    if (pageGroup[pageGroups]) {
      newpages = pageGroup[pageGroups].map((item) => {
        return item;
      });
      setPages(newpages);
    }
  }, [pageGroups, pageGroup]);
  // 다음 페이지그룹으로 이동하는 함수
  const handleNextGroup = (pageGroupsNum: number) => {
    const nextGroup = ++pageGroupsNum;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pageGroup[nextGroup][0] || 0,
        pageGroups: nextGroup || 0,
      },
    });
  };
  // 이전 페이지 그룹으로 이동하는 함수
  const handlePrevGroup = (pageGroupsNum: number) => {
    const prevGroup = --pageGroupsNum;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pageGroup[prevGroup][9] || 0,
        pageGroups: prevGroup || 0,
      },
    });
  };
  // 마지막 그룹을 알기위한 변수
  const lastPageGroup = pageGroup.length - 1;

  // 에러처리 -> pageGroups가 lasPageGroup을 넘는경우 404페이지로 라우팅
  const [pageGroupNum, setPageGroupNum] = useState<number>(0);
  useEffect(() => {
    setPageGroupNum(pageGroups);
  }, [pageGroups]);
  useEffect(() => {
    if (lastPageGroup > 0) {
      if (pageGroupNum > lastPageGroup) {
        router.push("/404");
      }
    }
  }, [lastPageGroup, pageGroupNum, router]);

  // currentPage : 현재 페이지
  // handlePageChange : 페이지 번호 클릭시 라우팅(page번호 change)
  // pages : 모든 페이지 그룹을 보여주는 2차원 배열
  // handleNextGroup, handlePrevGroup : 이전,다음 페이지 그룹으로 라우팅(page도 자동 라우팅)
  // lastPageGroup : 마지막 페이지 그룹을 알기위한 변수(pageGroups를 포커싱하여 '다음'버튼 ui 컨트롤)
  // pageGroups : 현재 페이지 그룹의 인덱스
  return {
    currentPage,
    handlePageChange,
    pages,
    handleNextGroup,
    handlePrevGroup,
    lastPageGroup,
    pageGroups,
  };
};
