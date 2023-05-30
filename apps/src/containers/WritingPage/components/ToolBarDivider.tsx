import React from 'react';
import styled from 'styled-components';

export const ToolBarDivider: React.FC = (props) => {
  return <Divider />;
};

const Divider = styled.div`
  height: 20px;
  margin: 0px 8px;
  border-left: 1px solid ${({ theme }) => theme.border};
`;
