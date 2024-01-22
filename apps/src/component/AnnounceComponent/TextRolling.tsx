import Link from "next/link";
import Slider from "react-slick";
import styled from "styled-components";
import { useGetAnnounce } from "../../hooks/announce/useGetAnnounce";
import CampaignIcon from "/public/announceCompoImages/campaign.svg";

type SlidePropType = {
  txt: string;
  props?: boolean | number;
};
type AnnounceDataType = {
  id: number;
  title: string;
};

const CustomSlide = ({ txt, ...props }: SlidePropType) => {
  return (
    <TextSet {...props}>
      <ImgDiv>
        <CampaignIcon width="20px" height="12px" />
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

  const { data } = useGetAnnounce();

  console.log(data);
  return (
    <Slider {...settings}>
      {data.content &&
        data.content.map((item: AnnounceDataType) => {
          return (
            <Link href={`/board/공지/${item.id}`} key={item.id}>
              <CustomSlide txt={item.title} />
            </Link>
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
  gap: 4px;
  position: relative;
  top: -24px;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  color: ${({ theme }) => theme.brand};
`;
const InfoText = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
`;
