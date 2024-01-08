import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColorThief from "colorthief";
import {
  usePickChar,
  useRefreshChar,
} from "../../../../hooks/myPageHooks/useUserChar";
import LoadingSpinner from "../../../../component/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import RefreshIcon from "/public/myPageImages/refresh.svg";

export interface CharInfo {
  avatar: string | null;
  id: number;
  job: string | null;
  level: number | null;
  nickName: string;
  pickByUser: boolean;
  world: string | null;
}

const convertRGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

const CharBox = ({
  avatar,
  id,
  job,
  level,
  nickName,
  pickByUser,
  world,
}: CharInfo) => {
  const darkModeState = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  // const [isCharBoxClick, setIsCharBoxClick] = useState<boolean>(pickByUser);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [imageRandomColor, setImageRandomColor] = useState<string>("");
  const [refreshOn, setRefreshOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  console.log(imageRandomColor);

  const { mutate: pickChar } = usePickChar({
    charId: id,
    options: {},
  });
  const { mutate: refreshChar } = useRefreshChar({
    name: nickName,
    LoadingController: setIsLoading,
  });

  useEffect(() => {
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener("load", function () {
      const colorRGB = colorThief.getColor(img);
      const color = convertRGBToHSL(colorRGB[0], colorRGB[1], colorRGB[2]);
      setImageRandomColor(
        darkModeState
          ? `hsl(${color[0]}, 15%, 25%)`
          : `hsl(${color[0]}, 100%, 95%)`
      );
    });

    // TODO: 현재 구글의 프록시 서버를 사용한다. 배포 전에 자체 프록시 서버로 변경해야한다.
    img.crossOrigin = "Anonymous";
    img.src =
      `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=${avatar}` ||
      "/myPageImages/defaultChar.png";
  }, [avatar, darkModeState]);

  return (
    <Container disable={avatar} color={imageRandomColor}>
      <CharInfoBox
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
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
      <ImgWrapper
        disable={avatar}
        onMouseEnter={() => setRefreshOn(true)}
        onMouseLeave={() => setRefreshOn(false)}
      />
      <RefreshBtnPosition>
        <CharImg src={avatar || "/myPageImages/defaultChar.png"} id="char" />
        {refreshOn && (
          <ImgPosition
            onMouseEnter={() => setRefreshOn(true)}
            onMouseLeave={() => setRefreshOn(false)}
          >
            {isLoading ? (
              <LoadingSpinner width={15} height={15} borderWidth={2} />
            ) : (
              <RefreshIcon
                width="20"
                height="20"
                onClick={async () => {
                  await refreshChar();
                }}
              />
            )}
          </ImgPosition>
        )}
      </RefreshBtnPosition>
    </Container>
  );
};

export default CharBox;

const Container = styled.div<{ color: string | null; disable: string | null }>`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 16px;
  width: 144px;
  height: 173px;
  box-sizing: border-box;
  background-color: ${({ color, disable, theme }) =>
    disable ? color : theme.characterCardDisableBackground};
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
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  svg {
    color: ${({ theme }) => theme.characterCardButton};
  }
`;
const CharImg = styled.img`
  position: relative;
  top: -47px;
  left: -15px;
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
  width: 100%;
  border: 1px solid
    ${({ isRepresent, isHover, theme, isActive }) =>
      isRepresent
        ? theme.brand
        : isHover
        ? theme.brandHover
        : isActive
        ? theme.brandActive
        : theme.border};
  background-color: ${({ theme }) => theme.card};
  position: absolute;
  bottom: 0px;
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
  color: ${({ theme }) => theme.text};
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
