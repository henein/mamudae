import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Bottom>
      <InlineBox>
        <Title>Henein</Title>
        <CopyRight>© Gamza. All rights reserved</CopyRight>
      </InlineBox>
    </Bottom>
  );
};

export default Footer;

const Bottom = styled.div`
  background-color: ${({ theme }) => theme.footerBackground};
  height: 144px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  width: 100%;
`;
const InlineBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.footerText};
  font-size: 24px;
  font-weight: 900;
  line-height: 29.05px;
  margin-bottom: 4px;
`;
const CopyRight = styled.span`
  color: ${({ theme }) => theme.footerSubText};
  font-size: 12px;
  line-height: 14.52px;
`;
