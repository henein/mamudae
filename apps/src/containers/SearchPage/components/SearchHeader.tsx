import React from "react";
import styled from "styled-components";

const SearchHeader = () => {
  return (
    <Container>
      <SelectBoard>
        <option value="E">전체</option>
        <option value="F">자유</option>
        <option value="I">정보</option>
        <option value="H">유머</option>
        <option value="B">보스</option>
        <option value="I">직업</option>
      </SelectBoard>
    </Container>
  );
};

export default SearchHeader;

const Container = styled.div``;

const SelectBoard = styled.select`
  width: 69px;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: white;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  border-radius: 8px;
  ::after {
    display: none;
  }
`;
