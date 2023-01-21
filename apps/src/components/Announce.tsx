import Image from "next/image";
import React from "react";
import styled from "styled-components";
import campaign from "../../assets/campaign.svg";

const Announce = () => {
  return (
    <Layout>
      <div>
        <Image src={campaign} width='20' height='16' alt='campaignimg' />
        헤네인 공지사항입니다.
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
    svg {
      color: #ff8038f2;
    }
  }
`;
