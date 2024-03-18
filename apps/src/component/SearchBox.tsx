import React from "react";
import styled from "styled-components";
import SearchIcon from "/public/headerCompoImages/search.svg";

const SearchBox = ({ width }: any) => {
  return (
    <Container>
      <InnerInput placeholder="검색" />
      <SearchIcon width="24px" height="24px" />
    </Container>
  );
};

export default SearchBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 4px 4px 4px 16px;
  background-color: ${({ theme }) => theme.input};
  svg {
    color: ${({ theme }) => theme.subText};
    margin: 4px;
  }
`;
const InnerInput = styled.input`
  background-color: ${({ theme }) => theme.input};
  border: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 100%;
  outline: none;
`;
