import React from "react";
import styled from "styled-components";
import Label from "../Label";
import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
import Link from "next/link";

const CompleteLogin = ({ ...data }: any) => {
  const { removeLocalStorage } = useLocalStorage();
  const logout = () => {
    removeLocalStorage("access");
    removeLocalStorage("refresh");
    window.location.reload();
  };
  return (
    <LoginContainer>
      <LoginHeader>
        <RepresentativeImage
          src={data.imageUrl || "/detailPageImages/Ellipse.png"}
          alt=""
        ></RepresentativeImage>
        <Profile>
          <Char>
            <Label type="level">대표</Label>
            <CharNickname>프돔이</CharNickname>
          </Char>
          <Nickname>{data.userName}</Nickname>
        </Profile>
      </LoginHeader>
      <LoginFooter>
        <Link href="/myPage">
          <MyInfo>내 정보</MyInfo>
        </Link>
        <LogOut onClick={logout}>로그아웃</LogOut>
      </LoginFooter>
    </LoginContainer>
  );
};

export default CompleteLogin;
const MyInfo = styled.div`
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
  &:hover {
    cursor: pointer;
  }
`;
const LogOut = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${(prop) => prop.theme.brand};
  &:hover {
    cursor: pointer;
  }
`;
const LoginFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Char = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const CharNickname = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.subText};
`;
const Nickname = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${(prop) => prop.theme.text};
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: 100%;
`;
const RepresentativeImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 100%;
  background-color: #dedede;
`;
const LoginHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 20px 24px;
  display: flex;
  align-items: initial;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  width: 300px;
  height: 118px;
`;
