import React from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
import time from "/public/detailPageImages/schedule.png";
import watch from "/public/detailPageImages/visibility.png";
import Image from "next/image";

const Title = () => {
  return (
    <Container>
      <Name>제목</Name>
      <WriteState>
        <NicknameAndFloor>
          <Nickname>익명</Nickname>
          <Floor>48층</Floor>
        </NicknameAndFloor>
        <TimeAndWatch>
          <Time>
            <CustomImage src={time} alt="none" />
            3일 전
          </Time>
          <Watch>
            <CustomImage src={watch} alt="none" />
            1000
          </Watch>
        </TimeAndWatch>
      </WriteState>
    </Container>
  );
};

export default Title;
const Container = styled.div`
  z-index: 1;
  top: 0;
  box-shadow: 0 2px 4px ${customColor.shadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 32px;
  min-height: 97px;
  border-bottom: 1px solid ${customColor.whiteGray};
  padding: 0 24px;
  position: sticky;
  opacity: 0.7;
  backdrop-filter: blur(30px);
  background-color: ${customColor.white};
`;

const CustomImage = styled(Image)`
  margin-right: 4px;
`;

const Nickname = styled.div`
  margin-right: 4px;
  font-size: 12px;
  color: ${customColor.gray};
`;
const Floor = styled.div`
  padding: 2px 4px;
  color: ${customColor.white};
  font-size: 10px;
  background-color: ${customColor.floor};
  border-radius: 8px;
`;
const TimeAndWatch = styled.div`
  display: flex;
  align-items: center;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  font-size: 12px;
  color: ${customColor.gray};
`;
const Watch = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${customColor.gray};
`;
const NicknameAndFloor = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 8px;
`;
const WriteState = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
