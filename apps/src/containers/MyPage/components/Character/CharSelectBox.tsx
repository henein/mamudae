import { useState } from "react";
import styled, { css } from "styled-components";
import CharBox from "./CharBox";

interface CharSelectBoxType {
  type: "인증" | "미인증";
}
const CharSelectBox = ({ type }: CharSelectBoxType) => {
  const [optionNum, setOptionNum] = useState<number>(1);
  return (
    <BoxContent>
      <Title>{type} 캐릭터</Title>
      <BoxLayout>
        <ContentSortOption>
          <HighLevelSort
            onClick={() => setOptionNum(1)}
            isSelect={optionNum == 1}
          >
            높은 레벨
          </HighLevelSort>
          <LowLevelSort
            onClick={() => setOptionNum(2)}
            isSelect={optionNum == 2}
          >
            낮은 레벨
          </LowLevelSort>
          <NameSort onClick={() => setOptionNum(3)} isSelect={optionNum == 3}>
            이름
          </NameSort>
        </ContentSortOption>
        <InnerAllChar>
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
          <CharBox type={type} />
        </InnerAllChar>
      </BoxLayout>
    </BoxContent>
  );
};
export default CharSelectBox;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* padding: 20px 24px; */
`;
export const Title = styled.h1`
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  padding: 8px 8px 0px 8px;
`;
export const BoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ContentSortOption = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;
const btnStyle = css<{ isSelect: boolean }>`
  padding: 8px 12px;
  color: ${({ isSelect, theme }) => (isSelect ? "white" : theme.subText)};
  background-color: ${({ isSelect, theme }) =>
    isSelect ? "#212225" : "white"};
  font-size: 12px;
  font-weight: ${({ isSelect }) => (isSelect ? "700" : "400")};
  line-height: normal;
  border-radius: 16px;
`;
const HighLevelSort = styled.button`
  ${btnStyle};
`;
const LowLevelSort = styled.button`
  ${btnStyle};
`;
const NameSort = styled.button`
  ${btnStyle};
`;
const InnerAllChar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 22px;
`;
