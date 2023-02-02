import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Announce = () => {
  return (
    <Layout>
      <div>
        <span>
          <div className='img'>
            <Image
              src='/campaign.svg'
              width='20'
              height='16'
              alt='campaignimg'
            />
          </div>
          <span className='text'>헤네인 공지사항입니다.</span>
        </span>
      </div>
    </Layout>
  );
};

export default Announce;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1140px;
    height: 64px;
    border: 1px solid #e6e6e6;
    border-radius: 32px;
    box-sizing: border-box;
    gap: 5px;
    .img {
      width: 24px;
      height: 24px;
      border: none;
      margin-right: 4px;
    }
    span {
      display: flex;
      line-height: 24px;
    }
    .text {
      font-size: 20px;
      font-weight: 400;
    }
  }
`;
