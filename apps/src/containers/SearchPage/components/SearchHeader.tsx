import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from '../../../component/SearchBox';
import { useGetBoardList } from '../../../hooks/board/useGetBoard';

const SearchHeader = () => {
  const { data } = useGetBoardList();
  const [type, setType] = useState('ALL');
  return (
    <Container>
      <SelectBox>
        <SelectBoard onChange={(e) => setType(e.target.value)}>
          <option value="ALL">전체</option>
          {data &&
            data.data.map((item: string) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
        </SelectBoard>
      </SelectBox>
      <SearchBox type={type} />
    </Container>
  );
};

export default SearchHeader;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0px 11px;
  background-color: ${({ theme }) => theme.input};
`;
const SelectBoard = styled.select`
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  border: none;
`;
