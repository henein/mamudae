import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";

const SearchContent = () => {
  return (
    <Container>
      <Title>
        <strong>‘배매 코강’</strong> 관련 게시글을 128개 찾았어요.
      </Title>
      <SearchList>
        <SearchItem />
        <Line />
        <SearchItem />
        <Line />
        <SearchItem />
        <Line />
        <SearchItem />
        <Line />
        <SearchItem />
        <Line />
        <SearchItem />
      </SearchList>
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
const Line = styled.hr`
  width: 100%;
  border: 0.5px solid ${({ theme }) => theme.divider};
`;
