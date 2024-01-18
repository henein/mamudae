import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { customColor } from '../../../constants/customColor';
import Image from 'next/image';
import kakaoIcon from '/public/loginPageImages/KaKao.png';
import Button from '../../../component/Button';
import useKaKao from '../../../hooks/kakao/useKaKao';
import { LocalLoginProps } from '../../../api/localLogin';
import { useLocalLogin } from '../../../hooks/localLogin/useLocalLogin';
import { TextField } from '../../../component/TextField';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useKaKao();
  const [localLoginForm, setLocalLoginForm] = useState<LocalLoginProps>({
    email: '',
    password: '',
  });
  const { mutate } = useLocalLogin(localLoginForm);

  const submit = async (data: FieldValues) => {
    await setLocalLoginForm({
      email: data.email,
      password: data.password,
    });
    await mutate();
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <Title>로그인</Title>
      <TextField
        register={register('email')}
        type="email"
        placeholder="이메일"
      />
      <TextField
        register={register('password')}
        type="password"
        placeholder="비밀번호"
      />
      <Button type="submit" sort="primary" width="100%" fontWeight="700">
        로그인
      </Button>
      <Lines>
        <Line />
        <MidLineTextDiv>또는</MidLineTextDiv>
        <Line />
      </Lines>
      <KakaoBtn type="button">
        <KakaoDiv onClick={login}>
          <KakaoImg src={kakaoIcon} alt="s" />
          <span>Kakao로 로그인하기</span>
        </KakaoDiv>
      </KakaoBtn>
    </Container>
  );
};

export default LoginForm;

const KakaoImg = styled(Image)`
  position: absolute;
  left: 14px;
  width: 17px;
  height: 17px;
`;
const KakaoDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
  justify-content: center;
`;
const Container = styled.form`
  border: 1px solid ${(prop) => prop.theme.border};
  width: 380px;
  background-color: ${(prop) => prop.theme.card};
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  padding: 20px 24px;
`;
const Title = styled.span`
  padding: 8px;
  font-size: 20px;
  font-weight: 700;
  color: ${(prop) => prop.theme.text};
`;
const Lines = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Line = styled.hr`
  width: calc((100% - 30px) / 2);
  border: none;
  border-top: 1px solid ${({ theme }) => theme.divider};
`;
const MidLineTextDiv = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.subText};
  width: 30px;
  text-align: center;
`;
const KakaoBtn = styled.button`
  border-radius: 8px;
  border: 1px solid ${customColor.whiteGray};
  background-color: ${customColor.yellow};
  font-size: 14px;
  color: ${customColor.black};
  width: 100%;
  height: 41px;
  &:hover {
    background-color: ${customColor.darkYellow};
  }
  &:active {
    transform: scale(0.98);
  }
`;
