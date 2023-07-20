import React from "react";
import styled, { css } from "styled-components";

interface UserHistoryBox {
  title: string;
  history: string;
}
const UserHistoryBox = ({ title, history }: UserHistoryBox) => {
  return (
    <Container>
      <Title>{title}</Title>
      <HistoryCont>{history}</HistoryCont>
    </Container>
  );
};

export default UserHistoryBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 248px;
  padding: 20px 24px;
  gap: 16px;
`;
const fontStyle = css`
  color: ${({ theme }) => theme.Text};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-size: 16px;
`;
const Title = styled.h2`
  ${fontStyle}
`;
const HistoryCont = styled.h2`
  ${fontStyle}
  color: #000;
  font-size: 32px;
`;
