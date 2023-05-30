import React from 'react';
import styled from 'styled-components';

export interface CardProps extends React.PropsWithChildren {
  className?: string
}

export const Card: React.FC<CardProps> = (props) => {
  return <Container className={props.className}>{props.children}</Container>;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;
