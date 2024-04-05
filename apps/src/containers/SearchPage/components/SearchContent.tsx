import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../../../component/LoadingSpinner';
import { useGetSearchList } from '../../../hooks/searchPageHooks/useSearch';
import Pagenate from './Pagenate';
import SearchItem from './SearchItem';

const SearchContent = ({ type, value, page }: any) => {
  const { searchData, isLoading } = useGetSearchList({ type, value, page });

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner width={30} height={30} borderWidth={3} />
      ) : (
        <>
          <Title>
            <strong>’{value}’</strong> 관련 게시글을 {searchData.totalElements}
            개 찾았어요.
          </Title>
          <SearchList>
            {searchData.content.length &&
              searchData.content.map((item: any, idx: number) => {
                if (idx === searchData.content.length - 1) {
                  return <SearchItem {...item} key={item.id} />;
                } else {
                  return (
                    <div key={idx}>
                      <SearchItem key={item.id} {...item} />
                      <Line />
                    </div>
                  );
                }
              })}
          </SearchList>
        </>
      )}
      <Pagenate data={searchData} />
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
`;
const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.divider};
  margin: 8px 0px;
`;
