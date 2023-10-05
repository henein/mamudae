import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../../component/Button";
import { useSetUserInfo } from "../../../../hooks/myPageHooks/useUserProfile";

interface UserProfileType {
  imageUrl: string;
  userEmail: string;
  userName: string;
}

const UserInfoBox = ({ ...props }: UserProfileType) => {
  const { imageUrl, userEmail, userName } = props;

  const [userForm, setUserForm] = useState<{
    image: File | null;
    userName: string | null;
  }>({ image: null, userName: "" });
  const [src, setSrc] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { mutate } = useSetUserInfo({ forms: userForm });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setUserForm({ ...userForm, image: selectedImage });
      setSrc(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(() => {
    if (src || nickname) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [src, nickname]);

  return (
    <Outer>
      <Container>
        <EmailDiv>
          <KakaoDiv>
            <Image
              src="/myPageImages/kakao.svg"
              width={18}
              height={18}
              alt=""
            />
          </KakaoDiv>
          <UserEmail>{userEmail}</UserEmail>
        </EmailDiv>
        <InputDiv>
          <ImgSelect>
            <ProfileImg
              src={src || imageUrl || "/detailPageImages/Ellipse.png"}
            />
            <ProfileInput
              id="input-file"
              type="file"
              onInput={handleImageUpload}
            />
            <InputLabel htmlFor="input-file" />
          </ImgSelect>
          <TextDiv>
            <Nickname
              placeholder={userName || "익명"}
              onChange={(e: any) => {
                setNickname(e.target.value);
              }}
            />
          </TextDiv>
        </InputDiv>
      </Container>
      <Button
        sort="primary"
        type="submit"
        width="fit-content"
        fontWeight="400"
        disabled={isDisabled}
        onClick={async (e: any) => {
          e.preventDefault();
          await setUserForm({ ...userForm, userName: nickname });
          await mutate();
        }}
      >
        저장하기
      </Button>
    </Outer>
  );
};

export default UserInfoBox;
const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 528px;
  height: fit-content;
  padding: 20px 24px;
  gap: 16px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
`;
const EmailDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.divider};
  padding-bottom: 16px;
`;
const KakaoDiv = styled.div`
  width: 36px;
  height: 36px;
  padding: 8px;
  background-color: #fee500;
  border: 1px solid ${({ theme }) => theme.divider};
  border-radius: 8px;
`;
const UserEmail = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
`;
const ImgSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
`;
const ProfileInput = styled.input`
  display: none;
`;
const InputLabel = styled.label`
  position: absolute;
  width: 128px;
  height: 128px;
  border-radius: 100%;
`;
const ProfileImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  background-color: #d9d9d9;
  border-radius: 100%;
`;
const InputDiv = styled.form`
  display: flex;
  flex-direction: column;
`;
const TextDiv = styled.div`
  height: 55px;
`;
const WarnText = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.danger};
  font-size: 10px;
  font-weight: 400;
`;
const Nickname = styled.input`
  width: 200px;
  height: 41px;
  padding: 16px 12px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.input};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.subText};
    font-size: 14px;
    font-weight: 400;
  }
  margin-top: 13px;
`;
