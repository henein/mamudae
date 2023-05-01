import React, { useState } from "react";
import styled from "styled-components";
import { customColor } from "../constants/customColor";
import Image from "next/image";
import circle from "/public/detailPageImages/Ellipse.png";
import Label from "./Label";
import { useLocalStorage } from "../hooks/storage/useLocalStorage";

const CompleteLogin = ({ username }: any) => {
  const { removeLocalStorage } = useLocalStorage();
  const logout = () => {
    removeLocalStorage("access");
    removeLocalStorage("refresh");
    window.location.reload();
  };
  return (
    <LoginContainer>
      <LoginHeader>
        <RepresentativeImage src={circle} alt="none"></RepresentativeImage>
        <Profile>
          <Nickname>{username}</Nickname>
          <Honours>
            <Label type="level">2150</Label>
            <Label type="floor">49층</Label>
            <Label type="job">전사</Label>
          </Honours>
        </Profile>
      </LoginHeader>
      <LoginFooter>
        <MyInfo>내 정보</MyInfo>
        <LogOut onClick={logout}>로그아웃</LogOut>
      </LoginFooter>
    </LoginContainer>
  );
};

export default CompleteLogin;
const MyInfo = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: ${(prop) => prop.theme.subText};
  &:hover {
    cursor: pointer;
  }
`;
const LogOut = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: ${(prop) => prop.theme.Brand};
  &:hover {
    cursor: pointer;
  }
`;
const LoginFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Level = styled.div`
  padding: 2px 4px;
  color: ${customColor.white};
  font-size: 10px;
  background-color: ${customColor.level};
  border-radius: 8px;
  margin-right: 4px;
`;
const Floor = styled.div`
  padding: 2px 4px;
  color: ${customColor.white};
  font-size: 10px;
  background-color: ${customColor.floor};
  border-radius: 8px;
`;
const Honours = styled.div`
  display: flex;
  gap: 4px;
`;
const Nickname = styled.div`
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 8px;
  color: ${(prop) => prop.theme.Text};
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const RepresentativeImage = styled(Image)`
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;
const LoginHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
const LoginContainer = styled.div`
  padding: 20px 24px;
  display: flex;
  align-items: initial;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  width: 300px;
  height: 118px;
`;
