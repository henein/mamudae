import React, { useState } from 'react';
import styled from 'styled-components';
import useDateSelectorModalState from '../../../../store/modal/dateSelector';
import Button from '../../Button';
import { Bottom, Container, Content } from '../modalCommonStyle';
import PortalWrapper from '../Portal';
import DateSelector from './DateSelector';

const DateSelectorModal = ({ mutate }: any) => {
  const { close } = useDateSelectorModalState();
  const [pastDay, setPastDay] = useState<string>('');
  const [recentDay, setRecentDay] = useState<string>('');

  return (
    <PortalWrapper>
      <Container>
        <Content>
          <Phrases>큐브 사용 조회 기간을 입력해주세요.</Phrases>
          <DateSelector setPastDay={setPastDay} setRecentDay={setRecentDay} />
        </Content>
        <Bottom>
          <Button type="button" sort="secondary" onClick={close}>
            취소
          </Button>
          <Button
            type="submit"
            sort="primary"
            onClick={async () => {
              if (pastDay && recentDay) {
                await alert(
                  '사용자의 큐브 내역을 통해 캐릭터 닉네임을 조회합니다. (사용자 정보에 따라 시간차이가 발생할 수 있습니다.)'
                );
                await mutate({ recentDay: recentDay, pastDay: pastDay });
              } else {
                alert('날짜를 선택해주세요');
              }
            }}
          >
            인증하기
          </Button>
        </Bottom>
      </Container>
    </PortalWrapper>
  );
};

export default DateSelectorModal;

const Phrases = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
