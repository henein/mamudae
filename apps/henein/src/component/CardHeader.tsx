import React from 'react';
import styled from 'styled-components';

export interface CardHeaderProps extends React.PropsWithChildren {
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
  return <Container className={props.className}>{props.children}</Container>;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.cardHeader};
  outline: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0px 4px 8px ${({ theme }) => theme.boxShadow};
  backdrop-filter: blur(8px);
`;
