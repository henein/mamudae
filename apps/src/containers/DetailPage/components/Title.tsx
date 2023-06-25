import React from "react";
import styled from "styled-components";
import time from "/public/detailPageImages/schedule.png";
import watch from "/public/detailPageImages/visibility.png";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";
import timeDifference from "../../../utils/timeDifference";

interface ITitle {
  title: string;
  name: string;
  views: number;
  createTime: string;
}

const Title = ({ title, name, views, createTime }: ITitle) => {
  return (
    <Container>
      <Name>{title}</Name>
      <WriteState>
        <NicknameAndFloor>
          <Nickname>{name}</Nickname>
          <Floor>48층</Floor>
        </NicknameAndFloor>
        <TimeAndWatch>
          <Time>
            <CustomImage src={time} alt="none" />
            {timeDifference(createTime)}
          </Time>
          <Watch>
            <CustomImage src={watch} alt="none" />
            {views}
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
  box-shadow: ${({ theme }) => `0px 4px 8px ${theme.boxShadow}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  min-height: 97px;
  border-bottom: 1px solid ${(prop) => prop.theme.border};
  padding: 0 24px;
  position: sticky;
  background-color: ${(prop) => prop.theme.cardHeader};
`;

const CustomImage = styled(Image)`
  margin-right: 4px;
`;

const Nickname = styled.div`
  margin-right: 4px;
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
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
  color: ${(prop) => prop.theme.subText};
`;
const Watch = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
`;
const NicknameAndFloor = styled.div`
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${(prop) => prop.theme.text};
`;
const WriteState = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
