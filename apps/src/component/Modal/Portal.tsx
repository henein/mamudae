import React, { ReactElement, useEffect, useState } from 'react';
import ReactDom, { createPortal } from 'react-dom';
import styled from 'styled-components';

const PortalWrapper = ({ children }: { children: ReactElement }) => {
  const root = document.getElementById('modal-root');
  return root && createPortal(<Wrapper>{children}</Wrapper>, root);
};

export default PortalWrapper;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.modalBackdrop};
  z-index: 999999;
`;
