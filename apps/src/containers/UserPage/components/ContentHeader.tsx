import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import useOptionSelectStore from '../../../../store/option/headerOption';

const ContentHeader = ({ ...props }) => {
  const router = useRouter();
  const buttons = useMemo(() => {
    return [
      { label: '게시글', value: 0, count: props.boardCount },
      { label: '댓글', value: 1, count: props.commentCount },
      { label: '캐릭터', value: 2, count: props.characterCount || 0 },
    ];
  }, [props]);

  const { setOptionNumber } = useOptionSelectStore();

  const onClick = (optionNum: number) => {
    setOptionNumber(optionNum);
    router.push(
      {
        query: { nickname: router.query.nickname },
      },
      undefined
    );
  };

  useEffect(() => {
    setOptionNumber(Number(localStorage.getItem('userPageOptionValue')));
  }, []);

  return (
    <Container>
      {buttons.map((item) => (
        <OptionBtn
          key={item.value}
          isSelect={
            item.value === Number(localStorage.getItem('userPageOptionValue'))
          }
          onClick={() => onClick(item.value)}
        >
          <span>
            {item.label} {item.count}
          </span>
        </OptionBtn>
      ))}
    </Container>
  );
};

export default ContentHeader;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 8px;
  border-radius: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  margin-bottom: 24px;
`;

const OptionBtn = styled.button<{ isSelect: boolean }>`
  padding: 20px 24px;
  color: ${({ isSelect, theme }) => (isSelect ? theme.text : theme.subText)};
  font-size: 16px;
  font-weight: ${({ isSelect }) => (isSelect ? '700' : '400')};
  line-height: normal;
  border-bottom: ${({ isSelect, theme }) =>
    isSelect
      ? `2px solid
    ${theme.brand}`
      : ''};
  background-color: none;
`;
