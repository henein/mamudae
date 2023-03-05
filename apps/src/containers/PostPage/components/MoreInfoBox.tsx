import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import dummy from "../../../dummy/dummy.json";
import { useRouter } from "next/router";

const MoreInfoBox = () => {
  const router = useRouter();

  return (
    <>
      <MoreInfo>
        <NextPageBtn>
          <Image
            src='/postPageImages/keyboard_arrow_left.svg'
            width='6'
            height='10'
            alt=''
          />
        </NextPageBtn>

        <PageNumBtn>1</PageNumBtn>
        <PageNumBtn>2</PageNumBtn>
        <PageNumBtn>3</PageNumBtn>
        <PageNumBtn>4</PageNumBtn>
        <PageNumBtn>5</PageNumBtn>
        <PageNumBtn>6</PageNumBtn>
        <PageNumBtn>7</PageNumBtn>
        <PageNumBtn>8</PageNumBtn>
        <PageNumBtn>9</PageNumBtn>
        <PageNumBtn>10</PageNumBtn>

        <NextPageBtn>
          <Image
            src='/postPageImages/keyboard_arrow_right.svg'
            width='6'
            height='10'
            alt=''
          />
        </NextPageBtn>
      </MoreInfo>
    </>
  );
};

export default MoreInfoBox;

const MoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
  border-top: 1px solid ${customColor.whiteGray};
`;
const NextPageBtn = styled.button`
  width: 32px;
  height: 32px;
  background-color: ${customColor.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const PageNumBtn = styled.button`
  width: 32px;
  height: 32px;
  color: ${customColor.darkGray};
  background-color: ${customColor.white};
  border: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
