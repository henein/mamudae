import React from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";

const SearchList = () => {
  return (
    <Container>
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
    </Container>
  );
};

export default SearchList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
