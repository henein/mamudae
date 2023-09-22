import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColorThief from "colorthief";
import Image from "next/image";
import {
  usePickChar,
  useRefreshChar,
} from "../../../../hooks/myPageHooks/useUserChar";
import { getCharInfo, getImgUrl } from "../../../../api/userInfo";

export interface CharInfo {
  avatar: string | null;
  id: number;
  job: string | null;
  level: number | null;
  nickName: string;
  pickByUser: boolean;
  world: string | null;
}

const CharBox = ({
  avatar,
  id,
  job,
  level,
  nickName,
  pickByUser,
  world,
}: CharInfo) => {
  // const [isCharBoxClick, setIsCharBoxClick] = useState<boolean>(pickByUser);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [imageRandomColor, setImageRandomColor] = useState<string>("");
  const [refreshOn, setRefreshOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const { mutate: pickChar } = usePickChar({
    charId: id,
    options: {},
  });
  const { mutate: refreshChar } = useRefreshChar({ nickName, setIsLoading });
  // image 배경색상 랜덤 선택
  // useEffect(() => {
  //   const img: HTMLImageElement | null = document.querySelector("img#char"); // => 여기 고쳐야할듯 getColor함수가 안먹음
  //   const colorThief = new ColorThief();

  //   if (img) {
  //     if (img.complete) {
  //       const fetchColor = async () => {
  //         const dominantColor = await colorThief.getColor(img);
  //         const rgbString = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

  //         setImageRandomColor(rgbString);
  //       };
  //       fetchColor();
  //     } else {
  //       // 돔에 맨 처음 진입했을때도 컬러 적용
  //       img.addEventListener("load", () => {
  //         const fetchColor = async () => {
  //           const dominantColor = await colorThief.getColor(img);
  //           const rgbString = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

  //           setImageRandomColor(rgbString);
  //         };
  //         fetchColor();
  //       });
  //     }
  //   }
  // }, []);

  return (
    <Container
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
    >
      <ImgWrapper
        disable={avatar}
        onMouseEnter={() => setRefreshOn(true)}
        onMouseLeave={() => setRefreshOn(false)}
      />
      <RefreshBtnPosition>
        <CharImg
          disable={avatar}
          src={avatar || "/myPageImages/defaultChar.png"}
          id="char"
          imageRandomColor={imageRandomColor}
        />
        {refreshOn && (
          <ImgPosition
            onMouseEnter={() => setRefreshOn(true)}
            onMouseLeave={() => setRefreshOn(false)}
          >
            <Image
              src="/myPageImages/refresh.svg"
              width="20"
              height="20"
              alt=""
              onClick={async () => {
                await refreshChar();
              }}
            />
          </ImgPosition>
        )}
      </RefreshBtnPosition>
      <CharInfoBox
        onClick={() => (avatar ? pickChar() : alert("미인증 캐릭터입니다."))}
        isRepresent={pickByUser}
        isHover={isHover}
        isActive={isActive}
      >
        <Top>
          {pickByUser && <Tag>대표</Tag>}
          <NickName>{nickName}</NickName>
        </Top>
        <Bottom>
          <JobnLevel>
            {job && level ? `${job} / ${level}` : "정보 없음"}
          </JobnLevel>
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
  box-sizing: border-box;
  overflow: hidden;
`;
const ImgWrapper = styled.div<{ disable: string | null }>`
  position: absolute;
  z-index: 1;
  width: 144px;
  height: 120px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
`;
const RefreshBtnPosition = styled.div`
  display: flex;
`;
const ImgPosition = styled.button`
  height: 20px;
  position: relative;
  top: 8px;
  right: 62px;
  z-index: 10;
`;
const CharImg = styled.img<{
  imageRandomColor: string;
  disable: string | null;
}>`
  position: relative;
  top: -47px;
  left: -15px;
  background-color: ${({ imageRandomColor, disable }) =>
    disable ? imageRandomColor : "#E0E1E6"};
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
  top: -87px;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  &:hover {
    box-shadow: 0px 0px 0px 4px rgba(0, 0, 0, 0.05);
    transition: box-shadow 200ms;
  }
  &:active {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
    transition: box-shadow 200ms;
  }
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
