import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColorThief from "colorthief";

interface CharBoxType {
  type: "인증" | "미인증";
}

const CharBox = ({ type }: CharBoxType) => {
  const [isCharBoxClick, setIsCharBoxClick] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [imageRandomColor, setImageRandomColor] = useState<string>("");

  // image 배경색상 랜덤 선택
  useEffect(() => {
    const img: HTMLImageElement | null = document.querySelector("img#char");
    const colorThief = new ColorThief();

    if (img) {
      if (img.complete) {
        const fetchColor = async () => {
          const dominantColor = await colorThief.getColor(img);
          const rgbString = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

          setImageRandomColor(rgbString);
          console.log(dominantColor);
        };
        fetchColor();
      } else {
        // 돔에 맨 처음 진입했을때도 컬러 적용
        img.addEventListener("load", () => {
          const fetchColor = async () => {
            const dominantColor = await colorThief.getColor(img);
            const rgbString = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            setImageRandomColor(rgbString);
          };
          fetchColor();
        });
      }
    }
  }, []);

  return (
    <Container
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onClick={() =>
        type == "인증"
          ? setIsCharBoxClick((prev) => !prev)
          : alert("미인증 캐릭터입니다.")
      }
    >
      <ImgWrapper disable={type == "미인증"} />
      <CharImg
        src="/myPageImages/character3.png"
        id="char"
        imageRandomColor={imageRandomColor}
      />
      <CharInfoBox
        isRepresent={isCharBoxClick}
        isHover={isHover}
        isActive={isActive}
      >
        <Top>
          {isCharBoxClick && <Tag>대표</Tag>}
          <NickName>프돔이</NickName>
        </Top>
        <Bottom>
          <JobnLevel>배틀메이지 / 260</JobnLevel>
        </Bottom>
      </CharInfoBox>
      ;
    </Container>
  );
};

export default CharBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 144px;
  height: 173px;
  overflow: hidden;
  box-shadow: none;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.05);
    transition: box-shadow 200ms;
    cursor: pointer;
  }
  &:active {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
    transition: box-shadow 200ms;
  }
`;
const ImgWrapper = styled.div<{ disable: boolean }>`
  position: absolute;
  z-index: 1;
  width: 144px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  background-color: ${({ disable }) => disable && "rgba(0, 0, 0, 0.20)"};
`;
const CharImg = styled.img<{ imageRandomColor: string }>`
  position: relative;
  top: -8px;
  background-color: ${({ imageRandomColor }) => imageRandomColor};
`;
const CharInfoBox = styled.div<{
  isRepresent: boolean;
  isHover: boolean;
  isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 20px 0px;
  border-radius: 15px;
  border: 1px solid
    ${({ isRepresent, isHover, theme, isActive }) =>
      isRepresent
        ? theme.brand
        : isHover
        ? theme.brandHover
        : isActive
        ? theme.brandActive
        : theme.border};
  background-color: white;
  position: relative;
  top: -47px;
  z-index: 2;
`;
const Top = styled.div`
  display: flex;
  gap: 4px;
`;
const Tag = styled.div`
  display: flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.brand};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 8px;
`;
const NickName = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
const Bottom = styled.div``;
const JobnLevel = styled.span`
  color: ${({ theme }) => theme.subText};
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
`;
