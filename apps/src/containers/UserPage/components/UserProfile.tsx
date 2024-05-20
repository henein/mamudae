import React from 'react';
import styled from 'styled-components';
import useProfileModifyModalState from '../../../../store/modal/profileModify';
import Button from '../../../component/Button';
import ProfileModifyModal from '../../../component/Modal/ProfileModifyModal';

const UserProfile = ({ ...props }) => {
  const { userName, userEmail, imageUrl, signUpDate, uid } = props;
  const { profileModifyOnModal, open } = useProfileModifyModalState();
  return (
    <Conatiner>
      <Wrapper>
        <ProfileImg src={imageUrl || '/detailPageImages/Ellipse.png'} />
        <UserInfo>
          <CreatedDate>
            가입일
            {signUpDate
              ?.map((num: number) => num.toString().padStart(2, '0'))
              .join('.')}
          </CreatedDate>
          <Nickname>{userName}</Nickname>
        </UserInfo>
      </Wrapper>
      <Button sort="secondary" onClick={open}>
        수정하기
      </Button>
    </Conatiner>
  );
};

export default UserProfile;

const Conatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 20px 24px;
  height: 148px;
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
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const CreatedDate = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.subText};
`;
const Nickname = styled.h1`
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
