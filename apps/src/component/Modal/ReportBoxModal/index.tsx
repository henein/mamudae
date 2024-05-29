import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import useReportBoxModalState from '../../../../store/modal/reportBox';
import Button from '../../Button';
import { Bottom, Container, Content } from '../modalCommonStyle';
import PortalWrapper from '../Portal';

const ReportBox = ({ type }: { type: 'board' | 'comment' | 'recomment' }) => {
  const { close } = useReportBoxModalState();
  const [optionNum, setOptionNum] = useState<number>(1);

  return (
    <PortalWrapper>
      <Container>
        <Content>
          <Header>신고</Header>
          <ButtonList>
            <StyledButton
              onClick={() => setOptionNum(1)}
              isSelect={optionNum == 1}
            >
              욕설/비방
            </StyledButton>
            <StyledButton
              onClick={() => setOptionNum(2)}
              isSelect={optionNum == 2}
            >
              광고/도배
            </StyledButton>
            <StyledButton
              onClick={() => setOptionNum(3)}
              isSelect={optionNum == 3}
            >
              음란물
            </StyledButton>
            <StyledButton
              onClick={() => setOptionNum(4)}
              isSelect={optionNum == 4}
            >
              불법촬영물
            </StyledButton>
            <StyledButton
              onClick={() => setOptionNum(5)}
              isSelect={optionNum == 5}
            >
              기타
            </StyledButton>
          </ButtonList>
          <TextArea placeholder="간단한 사유를 입력해주세요."></TextArea>
        </Content>
        <Bottom>
          <Button type="button" sort="secondary" onClick={close}>
            취소
          </Button>
          <Button type="submit" sort="danger" onClick={() => {}}>
            제출하기
          </Button>
        </Bottom>
      </Container>
    </PortalWrapper>
  );
};

export default ReportBox;

const Header = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 700;
`;
const ButtonList = styled.div`
  display: flex;
  gap: 8px;
`;
const btnStyle = css<{ isSelect: boolean }>`
  padding: 8px 12px;
  color: ${({ isSelect, theme }) => (isSelect ? 'white' : theme.subText)};
  background-color: ${({ isSelect, theme }) =>
    isSelect ? '#212225' : theme.card};
  font-size: 12px;
  font-weight: ${({ isSelect }) => (isSelect ? '700' : '400')};
  line-height: normal;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;
const StyledButton = styled.button`
  ${btnStyle}
`;
const TextArea = styled.textarea`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 12px 16px;
  min-width: 432px;
  min-height: 120px;
  outline: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
