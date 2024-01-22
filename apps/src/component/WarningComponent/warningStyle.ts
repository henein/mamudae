import styled from "styled-components";

export const View = styled.div<{ isWarning: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.modalBackdrop};
`;

export const Container = styled.div<{ isWarning: boolean }>`
  display: ${({ isWarning }) => (isWarning ? "flex" : "none")};
  width: 380px;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0px 4px 8px 0px ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ImgDiv = styled.div`
  color: ${({ theme }) => theme.danger};
`;

export const Content = styled.div`
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.card};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const Phrases = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
export const BtnList = styled.ul`
  display: flex;
  padding: 16px 24px;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.cardHeader};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  backdrop-filter: blur(4px);
`;
