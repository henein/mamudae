import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <InlineBox>
          <Title>Henein</Title>
          <CopyRight>© 2025. Henein All rights reserved. Henein is not associated with NEXON Korea.</CopyRight>
        </InlineBox>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: ${({ theme }) => theme.footerBackground};
  height: 144px;
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const InlineBox = styled.div`
  max-width: 1140px;
  margin: 0px auto;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.footerText};
  font-size: 24px;
  font-weight: 900;
  line-height: 29.05px;
  max-width: 1140px;
`;
const CopyRight = styled.span`
  color: ${({ theme }) => theme.footerSubText};
  font-size: 12px;
  line-height: 14.52px;
`;
