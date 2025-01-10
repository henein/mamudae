import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { customColor } from "../constants/customColor";

const KakaoBtn = () => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_PATHNAME}?response_type=${process.env.NEXT_PUBLIC_RESPONSE_TYPE}&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
    >
      <Container type="button">
        <KakaoDiv>
          <span>Kakao로 로그인하기</span>
        </KakaoDiv>
      </Container>
    </Link>
  );
};

export default KakaoBtn;

const Container = styled.button`
  border-radius: 8px;
  border: 1px solid ${customColor.whiteGray};
  background-color: ${customColor.yellow};
  font-size: 14px;
  color: ${customColor.black};
  width: 100%;
  height: 41px;
  &:hover {
    background-color: ${customColor.darkYellow};
  }
  &:active {
    transform: scale(0.98);
  }
`;
const KakaoDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
  justify-content: center;
  svg {
    position: absolute;
    left: 14px;
  }
`;
