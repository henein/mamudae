import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '/public/headerCompoImages/search.svg';

const SearchBox = ({ type }: any) => {
  const router = useRouter();
  const [text, setText] = useState<string>('');

  const submit = (e: any) => {
    e.preventDefault();
    if (text.length === 1) {
      alert('검색은 두글자 이상이어야 합니다.');
    } else {
      router.push({
        pathname: `/search`,
        query: { type: type, value: text, page: 1 },
      });
    }
  };
  return (
    <Container onSubmit={submit}>
      <InnerInput
        placeholder="검색"
        onChange={(e) => setText(e.target.value)}
      />
      <SearchIcon width="24px" height="24px" />
    </Container>
  );
};

export default SearchBox;

const Container = styled.form`
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
    &:hover {
      cursor: pointer;
    }
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
