import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from '../../../component/SearchBox';
import { useGetBoardList } from '../../../hooks/board/useGetBoard';

const SearchHeader = () => {
  const { data } = useGetBoardList();
  const [type, setType] = useState('ALL');
  return (
    <Container>
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
      <SearchBox type={type} />
    </Container>
  );
};

export default SearchHeader;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

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
