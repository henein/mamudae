import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLocalLogin } from '../../hooks/localLogin/useLocalLogin';
import { TextField } from '../../component/TextField';
import { Button } from '@henein/components';

interface LoginState {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const { register, handleSubmit } = useForm();
  const [localLoginForm, setLocalLoginForm] = useState<LoginState>({
    email: '',
    password: '',
  });

  const submit = async (data: FieldValues) => {
    setLocalLoginForm({
      email: data.email,
      password: data.password,
    });
    open();
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
      {/* <KakaoBtn /> */}
    </Container>
  );
};

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
