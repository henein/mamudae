import React from 'react';
import styled from 'styled-components';
import PortalWrapper from '../Portal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Button from '../../Button';
import { useProcessSlider } from '../../../hooks/userPageHooks/useUserChar';
import useNexonProccessModalState from '../../../../store/modal/nexonProcces';
import { Bottom } from '../modalCommonStyle';

const NexonApiProcessModal = () => {
  const { close } = useNexonProccessModalState();
  const { infoText, handleSlideChange } = useProcessSlider();

  return (
    <PortalWrapper>
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
        <CustomBottom>
          <InfoText>{infoText}</InfoText>
          <Button sort="secondary" onClick={close}>
            닫기
          </Button>
        </CustomBottom>
      </Container>
    </PortalWrapper>
  );
};

export default NexonApiProcessModal;

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
    background-image: url('/myPageImages/nextButton.svg');
  }
  .swiper-button-prev {
    background-image: url('/myPageImages/prevButton.svg');
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
const CustomBottom = styled(Bottom)`
  display: flex;
  justify-content: space-between;
`;
const InfoText = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
  a {
    color: #2183fa;
  }
`;
