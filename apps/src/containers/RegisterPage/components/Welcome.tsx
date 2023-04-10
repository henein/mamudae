import React from "react";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import Image from "next/image";
import circle from "/public/detailPageImages/Ellipse.png";
import Button from "../../../component/Button";

const Welcome = () => {
  return (
    <Container>
      <ProfileImg src={circle} alt="none"></ProfileImg>
      <Greeting>익명님 환영합니다 !!</Greeting>
      <CertifiedOrPass>
        <CertifiedBtn
          type="button"
          sort="main"
          width="100%"
          height="38px"
          fontWeight="900"
        >
          캐릭터 인증하기
        </CertifiedBtn>
        <PassBtn
          type="button"
          sort="sub"
          width="100%"
          height="38px"
          fontWeight="900"
        >
          건너뛰기
        </PassBtn>
      </CertifiedOrPass>
    </Container>
  );
};

export default Welcome;
const CertifiedBtn = styled(Button)`
  margin-bottom: 16px;
`;
const PassBtn = styled(Button)``;
const CertifiedOrPass = styled.div``;
const Greeting = styled.div`
  font-size: 20px;
  font-weight: 900;
  text-align: center;
`;

const Container = styled.form`
  z-index: 1;
  justify-content: space-between;
  border: 1px solid ${customColor.whiteGray};
  width: 380px;
  height: 356px;
  background-color: ${customColor.white};
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  padding: 28px 24px 20px 24px;
`;
const ProfileImg = styled(Image)`
  margin: 0 auto;
  width: 128px;
  height: 128px;
`;
