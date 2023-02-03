import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Announce = () => {
  return (
    <Layout>
      <ContentBox>
        <TextSet>
          <ImgDiv>
            <Image
              src='/campaign.svg'
              width='20'
              height='16'
              alt='campaignimg'
            />
          </ImgDiv>
          <InfoText>헤네인 공지사항입니다.</InfoText>
        </TextSet>
      </ContentBox>
    </Layout>
  );
};

export default Announce;
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1140px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 32px;
  box-sizing: border-box;
  gap: 5px;
`;
const TextSet = styled.span`
  display: flex;
  line-height: 24px;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  margin-right: 4px;
`;
const InfoText = styled.span`
  font-size: 20px;
  font-weight: 400;
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;
