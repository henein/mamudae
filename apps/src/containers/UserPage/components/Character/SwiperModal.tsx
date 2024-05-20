import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "../../../../component/Button";
import Image from "next/image";

const SwiperModal = ({ ...props }: any) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [infoText, setInfoText] = useState<any>();

  const handleSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const getSlideInfoText = (index: number) => {
    switch (index) {
      case 0:
        return (
          <>
            <a
              href="https://openapi.nexon.com/"
              target="_blank"
              rel="noreferrer"
            >
              NEXON Open API
            </a>
            에 접속해서 ➊로그인 하고 ➋My 애플리케이션으로 이동해주세요.
          </>
        );
      case 1:
        return <span>애플리케이션 등록하기를 눌러주세요.</span>;
      case 2:
        return <span>내용을 위와 같이 입력해주세요.</span>;
      case 3:
        return <span>➊약관 동의를 하고 ➋아래 등록 버튼을 눌러주세요.</span>;
      case 4:
        return <span>표시된 부분을 눌러서 상세 페이지로 이동해주세요.</span>;
      case 5:
        return <span>표시된 부분을 눌러서 API Key를 복사해주세요.</span>;
      default:
        return;
    }
  };

  useEffect(() => {
    setInfoText(getSlideInfoText(activeSlideIndex));
  }, [activeSlideIndex]);

  return (
    <View>
      <Container>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            <Image
              src="/myPageImages/process/1.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/myPageImages/process/2.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/myPageImages/process/3.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/myPageImages/process/4.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/myPageImages/process/5.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/myPageImages/process/6.png"
              alt=""
              width={800}
              height={480}
            />
          </SwiperSlide>
        </Swiper>
        <Bottom>
          <InfoText>{infoText}</InfoText>
          <Button sort="secondary" onClick={() => props.setOnModal(false)}>
            닫기
          </Button>
        </Bottom>
      </Container>
    </View>
  );
};

export default SwiperModal;
const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.modalBackdrop};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 553px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  /* 스와이퍼 컨텐츠영역 스타일링 */
  .swiper {
    width: 100%;
    height: 480px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
    background-color: white;
  }
  /* 스와이퍼 버튼 스타일링 */
  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.border};
    background: var(--card-header-background, rgba(255, 255, 255, 0.9));
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(4px);
    background-repeat: no-repeat;
    background-position: 50%;
    &::after {
      content: none;
    }
  }
  .swiper-button-next {
    background-image: url("/myPageImages/nextButton.svg");
  }
  .swiper-button-prev {
    background-image: url("/myPageImages/prevButton.svg");
  }
  .swiper-button-disabled {
    opacity: 0.3;
  }

  /* 스와이퍼 위치 불릿 스타일링 */
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.brand};
  }
`;
const Bottom = styled.div`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(4px);
  background-color: ${({ theme }) => theme.cardHeader};
  height: 73px;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;
const InfoText = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
  a {
    color: #2183fa;
  }
`;
