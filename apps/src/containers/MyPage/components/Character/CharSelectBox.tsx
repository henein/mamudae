import { useState } from "react";
import styled, { css } from "styled-components";
import CharBox from "./CharBox";
import { CharInfo } from "./CharBox";
import RefreshIcon from "/public/myPageImages/refresh.svg";
import LoadingSpinner from "../../../../component/LoadingSpinner";
import { useRefreshAllChar } from "../../../../hooks/myPageHooks/useUserChar";
interface CharSelectBoxType {
  charList: any;
}
const CharSelectBox = ({ charList }: CharSelectBoxType) => {
  const [optionNum, setOptionNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const idList = charList?.map((item: any) => item.id);
  const { mutate: refreshAllChar } = useRefreshAllChar({
    idList: idList,
    LoadingController: setIsLoading,
  });

  const newCharList = (optionNum: number) => {
    if (charList) {
      let sortedList = [...charList];

      // null 값을 맨 뒤로 이동하는 정렬 함수
      const moveNullToEnd = (array: CharInfo[]) => {
        const withoutNull = array.filter((item) => item.world !== null);
        const nulls = array.filter((item) => item.world === null);
        return [...withoutNull, ...nulls];
      };

      switch (optionNum) {
        case 1: // 높은 레벨 sort
          sortedList = sortedList.sort((a, b) => {
            if (a.level === null) return 1;
            if (b.level === null) return -1;
            return b.level - a.level;
          });
          break;
        case 2: // 낮은 레벨 sort
          sortedList = sortedList.sort((a, b) => {
            if (a.level === null) return 1;
            if (b.level === null) return -1;
            return a.level - b.level;
          });
          break;
        case 3: // 닉네임 sort
          sortedList = sortedList.sort((a, b) => {
            if (a.charName === null) return 1;
            if (b.charName === null) return -1;
            return a.charName.localeCompare(b.charName);
          });
          break;
        default:
          break;
      }

      // null 값을 맨 뒤로 이동
      sortedList = moveNullToEnd(sortedList);

      return sortedList;
    } else return;
  };
  const sortedCharList = newCharList(optionNum);

  return (
    <BoxContent>
      <TitleBox>
        <Title>캐릭터</Title>
        {isLoading ? (
          <LoadingSpinner width={15} height={15} borderWidth={2} />
        ) : (
          <RefreshIcon
            width="20"
            height="20"
            onClick={async () => {
              await refreshAllChar();
            }}
          />
        )}
      </TitleBox>
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
          {charList &&
            sortedCharList?.map((item: CharInfo, idx: number) => {
              return (
                <CharBox
                  avatar={item.avatar}
                  id={item.id}
                  job={item.job}
                  level={item.level}
                  charName={item.charName}
                  pickByUser={item.pickByUser}
                  world={item.world}
                  key={idx}
                />
              );
            })}
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
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 8px 0px 8px;
  svg {
    color: ${({ theme }) => theme.subText};
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.text};
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
  position: relative;
  z-index: 1;
`;
const btnStyle = css<{ isSelect: boolean }>`
  padding: 8px 12px;
  color: ${({ isSelect, theme }) => (isSelect ? "white" : theme.subText)};
  background-color: ${({ isSelect, theme }) =>
    isSelect ? "#212225" : theme.card};
  font-size: 12px;
  font-weight: ${({ isSelect }) => (isSelect ? "700" : "400")};
  line-height: normal;
  border: 1px solid ${({ theme }) => theme.border};
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
