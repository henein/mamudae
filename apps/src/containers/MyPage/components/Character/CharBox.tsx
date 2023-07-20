import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

interface CharBoxType {
  type: "인증" | "미인증";
}
const CharBox = ({ type }: CharBoxType) => {
  const [isCharBoxClick, setIsCharBoxClick] = useState<boolean>(false);
  return (
    <Container onClick={() => setIsCharBoxClick(true)}>
      <MoveImage
        src="/myPageImages/character1.svg"
        width={180}
        height={180}
        alt=""
        authState={type == "인증" ? true : false}
      />
      <CharInfoBox isCharBoxClick={isCharBoxClick}>
        <Top>
          {isCharBoxClick && <Tag>대표</Tag>}
          <NickName>프돔이</NickName>
        </Top>
        <Bottom>
          <JobnLevel>배틀메이지 / 260</JobnLevel>
        </Bottom>
      </CharInfoBox>
    </Container>
  );
};

export default CharBox;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  width: 144px;
  height: 173px;
  overflow: hidden;
  box-shadow: none;
  &:focus {
    box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.05);
    transition: box-shadow 200ms;
  }
  &:active {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
    transition: box-shadow 200ms;
  }
`;
const MoveImage = styled(Image)<{ authState: boolean }>`
  position: relative;
  z-index: 1;
  top: -33px;
  background-color: ${({ authState }) => !authState && "rgba(0, 0, 0, 0.2)"};
`;
const CharInfoBox = styled.div<{ isCharBoxClick: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 20px 0px;
  border-radius: 16px;
  border: 1px solid
    ${({ isCharBoxClick, theme }) =>
      isCharBoxClick ? theme.Brand : theme.border};
  background-color: white;
  position: relative;
  z-index: 2;
`;
const Top = styled.div`
  display: flex;
  gap: 4px;
`;
const Tag = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.Brand};
`;
const NickName = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
const Bottom = styled.div``;
const JobnLevel = styled.span`
  color: ${({ theme }) => theme.subText};
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
`;
