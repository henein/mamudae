import React from 'react';
import styled from 'styled-components';

export interface ToolBarButtonProps extends React.PropsWithChildren {
  isChecked?: boolean;
  onClick: VoidFunction;
}

export const ToolBarButton: React.FC<ToolBarButtonProps> = (props) => {
  return (
    <Container
      type="button"
      isChecked={props.isChecked}
      onClick={props.onClick}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.button<{ isChecked?: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.toolButtonHover : 'transparent'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    border: 1px solid ${({ theme }) => theme.border};
  }
`;
