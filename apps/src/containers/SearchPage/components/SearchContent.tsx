import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../../../component/LoadingSpinner";
import { useGetSearchList } from "../../../hooks/searchPageHooks/useSearch";
import SearchItem from "./SearchItem";

const SearchContent = ({ type, value, page }: any) => {
  const { searchData, isLoading } = useGetSearchList({ type, value, page });
  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner width={30} height={30} borderWidth={3} />
      ) : (
        <>
          <Title>
            <strong>’{value}’</strong> 관련 게시글을 {searchData.content.length}
            개 찾았어요.
          </Title>
          <SearchList>
            {searchData.content.length ? (
              searchData.content.map((item: any) => {
                return <SearchItem />;
              })
            ) : (
              // <NoneItem>관련된 게시글이 없습니다.</NoneItem>
              <></>
            )}
          </SearchList>
        </>
      )}
    </Container>
  );
};

export default SearchContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  font-weight: 400;
  strong {
    font-weight: 700;
  }
`;
const SearchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const NoneItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: aliceblue;
  color: ${({ theme }) => theme.text};
  font-size: 45px;
  font-style: normal;
  line-height: normal;
  font-weight: 400;
`;
const Line = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.divider};
`;
