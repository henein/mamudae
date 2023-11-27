import React from 'react';
import styled from 'styled-components';

export interface KakaoButtonProps {
    label: String;
    onClick?: () => void;
}

export const KakaoButton: React.FC<KakaoButtonProps> = (props) => {
  return <Container>{props.label}</Container>;
};

const Container = styled.button`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: #FEE500;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  height: 41px;
`;
