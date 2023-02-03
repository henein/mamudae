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
  background-color: #edebf2;
  height: 144px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;
const InlineBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 900;
  line-height: 29.05px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
`;
const CopyRight = styled.span`
  font-size: 12px;
  line-height: 14.52px;
  color: rgba(0, 0, 0, 0.3);
`;
