import React, { useState } from "react";
import styled, { css } from "styled-components";

interface SelectOptions {
  getOptionNum: (optionNum: number) => void;
}
const SelectOptions = ({ getOptionNum }: SelectOptions) => {
  const [optionNum, setoptionNum] = useState<number>(1);

  const clickBtn = (optionNum: number) => {
    setoptionNum(optionNum);
    getOptionNum(optionNum);
  };
  return (
    <Container>
      <OptionBtn isSelect={optionNum == 1} onClick={() => clickBtn(1)}>
        프로필
      </OptionBtn>
      <OptionBtn isSelect={optionNum == 2} onClick={() => clickBtn(2)}>
        캐릭터
      </OptionBtn>
      <OptionBtn isSelect={optionNum == 3} onClick={() => clickBtn(3)}>
        활동
      </OptionBtn>
    </Container>
  );
};

export default SelectOptions;
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: white;
  margin-bottom: 24px;
`;
const buttonStyle = css<{ isSelect: boolean }>`
  padding: 20px 24px;
  color: ${({ isSelect, theme }) => (isSelect ? theme.text : theme.subText)};
  font-size: 16px;
  font-weight: ${({ isSelect }) => (isSelect ? "700" : "400")};
  line-height: normal;
  border-bottom: ${({ isSelect, theme }) =>
    isSelect
      ? `2px solid
    ${theme.brand}`
      : ""};
`;

const OptionBtn = styled.button`
  ${buttonStyle}
  background-color: none;
`;
