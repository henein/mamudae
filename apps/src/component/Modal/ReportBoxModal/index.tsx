import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import useReportBoxModalState from '../../../../store/modal/reportBox';
import { ComplainReasonType, ComplainType } from '../../../api/complain';
import { usePostComplain } from '../../../hooks/detailPageHooks/useComplain';
import Button from '../../Button';
import { Bottom, Container, Content } from '../modalCommonStyle';
import PortalWrapper from '../Portal';

interface Props {
  type: ComplainType;
  targetId: number;
}
const ReportBox = ({ type, targetId }: Props) => {
  const [complainReason, setComplainReason] =
    useState<ComplainReasonType>('abuse');
  const [text, setText] = useState<string>('');
  const { close } = useReportBoxModalState();
  const { mutate } = usePostComplain(type, targetId);

  return (
    <PortalWrapper>
      <Container>
        <Content>
          <Header>신고</Header>
          <ButtonList>
            <StyledButton
              onClick={() => setComplainReason('abuse')}
              isSelect={complainReason == 'abuse'}
            >
              욕설/비방
            </StyledButton>
            <StyledButton
              onClick={() => setComplainReason('advertisement')}
              isSelect={complainReason == 'advertisement'}
            >
              광고/도배
            </StyledButton>
            <StyledButton
              onClick={() => setComplainReason('obscene')}
              isSelect={complainReason == 'obscene'}
            >
              음란물
            </StyledButton>
            <StyledButton
              onClick={() => setComplainReason('IllegalFilm')}
              isSelect={complainReason == 'IllegalFilm'}
            >
              불법촬영물
            </StyledButton>
            <StyledButton
              onClick={() => setComplainReason('another')}
              isSelect={complainReason == 'another'}
            >
              기타
            </StyledButton>
          </ButtonList>
          <TextArea
            placeholder="간단한 사유를 입력해주세요."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Content>
        <Bottom>
          <Button type="button" sort="secondary" onClick={close}>
            취소
          </Button>
          <Button
            type="submit"
            sort="danger"
            onClick={() => mutate({ complainReason, text })}
          >
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
