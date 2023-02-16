import React, { Component } from "react";
import Slider from "react-slick";
import dummy from "../../dummy/dummy.json";
import Image from "next/image";
import styled from "styled-components";

type SlidePropType = {
  txt: string;
  props?: boolean | number;
};

const CustomSlide = ({ txt, ...props }: SlidePropType) => {
  return (
    <TextSet {...props}>
      <ImgDiv>
        <Image
          src='/announceCompoImages/campaign.svg'
          width='20'
          height='16'
          alt='campaignimg'
        />
      </ImgDiv>
      <InfoText>{txt}</InfoText>
    </TextSet>
  );
};

const TextRolling = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {dummy.announcetxt.map((item, idx) => {
        return (
          <div key={idx}>
            <CustomSlide txt={item.text} />
          </div>
        );
      })}
    </Slider>
  );
};

export default TextRolling;

const TextSet = styled.div`
  display: flex;
  justify-content: center;
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
