import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../component/Button";
import Image from "next/image";
import circle from "/public/detailPageImages/Ellipse.png";
import { FieldValues, useForm } from "react-hook-form";
import { FormInputCss } from "../../LoginPage/components/Login";
import { useLocalStorage } from "../../../hooks/storage/useLocalStorage";
// import { useSetUserName } from "../../../hooks/user/useUserInfo";

interface IUserName {
  setName: string;
  accessToken: string | undefined;
}
const Profile = () => {
  // const { register, handleSubmit } = useForm();
  const { getLocalStorage } = useLocalStorage();

  const accessToken = getLocalStorage("access");
  const [userName, setUserName] = useState<IUserName>({
    setName: "",
    accessToken,
  });
  // const { mutate } = useSetUserName(userName);

  // 2~15 사이 문자열 전달
  const submit = async (data: FieldValues) => {
    await setUserName({ ...userName, setName: data.nickname });
    // await mutate();
  };

  return (
    <Container>
      <Title>프로필</Title>
      <ProfileImg src={circle} alt="none"></ProfileImg>
      <Nickname
        type="text"
        placeholder="닉네임"
        // {...register("nickname")}
        autoComplete="off"
      />
      <CompletionBtn type="submit" sort="primary" width="100%" fontWeight="700">
        완료
      </CompletionBtn>
    </Container>
  );
};

export default Profile;

const Title = styled.div`
  padding: 8px;
  font-size: 20px;
  font-weight: 900;
  color: ${(prop) => prop.theme.text};
`;
const ProfileImg = styled(Image)`
  margin: 0 auto;
  width: 128px;
  height: 128px;
`;
const Nickname = styled.input`
  ${FormInputCss}
`;
const CompletionBtn = styled(Button)``;
const Container = styled.form`
  z-index: 1;
  justify-content: space-between;
  border: 1px solid ${(prop) => prop.theme.border};
  width: 380px;
  height: 383px;
  background-color: ${(prop) => prop.theme.cardHeader};
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  padding: 20px 24px;
  position: absolute;
  top: calc(16% + 30px);
`;
