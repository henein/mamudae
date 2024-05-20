import React from 'react';
import styled from 'styled-components';
import useProfileModifyModalState from '../../../store/modal/profileModify';
import {
  useGetMyProfile,
  useSetProfileModifyData,
  useProfileModifyMutation,
} from '../../hooks/userPageHooks/useUserProfile';
import Button from '../Button';
import { Bottom, Container, Content } from './modalCommonStyle';
import PortalWrapper from './Portal';

const ProfileModifyModal = () => {
  const { close } = useProfileModifyModalState();
  const { data } = useGetMyProfile();

  const { userForm, src, isDisabled, handleImageUpload, setNickname } =
    useSetProfileModifyData();
  const { mutate } = useProfileModifyMutation({ forms: userForm });

  return (
    <PortalWrapper>
      <Container>
        <Content>
          <Header>프로필 수정</Header>
          <ImgSelect>
            <ProfileImg
              src={src || data?.imageUrl || '/detailPageImages/Ellipse.png'}
            />
            <ProfileInput
              id="input-file"
              type="file"
              onInput={handleImageUpload}
            />
            <InputLabel htmlFor="input-file" />
          </ImgSelect>
          <Input
            placeholder={data?.userName}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Content>
        <Bottom>
          <Button sort="secondary" onClick={close}>
            취소
          </Button>
          <Button sort="primary" onClick={mutate} disabled={isDisabled}>
            저장하기
          </Button>
        </Bottom>
      </Container>
    </PortalWrapper>
  );
};

export default ProfileModifyModal;
const Header = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: 700;
`;
const ImgSelect = styled.div`
  display: flex;
  justify-content: center;
`;
const ProfileInput = styled.input`
  display: none;
`;
const InputLabel = styled.label`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  position: absolute;
`;
const ProfileImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  background-color: #d9d9d9;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  margin: 0px auto;
`;
const Input = styled.input`
  width: 332px;
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
