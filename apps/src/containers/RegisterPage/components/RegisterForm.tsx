import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import useKaKao from '../../../hooks/kakao/useKaKao';
import {
  postAuthenticationMail,
  postLocalRegister,
  postVerifyCode,
} from '../../../api/localLogin';
import Button from '../../../component/Button';
import { TextField } from '../../../component/TextField';
import kaKao from '/public/loginPageImages/KaKao.png';
import { customColor } from '../../../constants/customColor';
import { FormInputCss } from '../../LoginPage/components/Login';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  verifyCode: string;
}

type RegisterPhase = 'email' | 'verify' | 'password';

const RegisterForm = () => {
  const [currentPhase, setCurrentPhase] = useState<RegisterPhase>('email');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [token, setToken] = useState('');

  const { login } = useKaKao();

  const { register, getValues, handleSubmit, formState } =
    useForm<RegisterFormInputs>();

  const onSubmit = async (data: FieldValues) => {
    switch (currentPhase) {
      case 'email': {
        try {
          await postAuthenticationMail(data.email);
        } catch (error) {
          alert(error);
          return;
        }

        setCurrentPhase('verify');
        break;
      }
      case 'verify': {
        try {
          setToken(await postVerifyCode(data.verifyCode));
        } catch (error) {
          alert(error);
          return;
        }

        setCurrentPhase('password');
        break;
      }
      case 'password':
        try {
          await postLocalRegister({
            email: data.email,
            password: data.password,
            token,
          });
        } catch (error) {
          alert(error);
          return;
        }

        break;
    }
  };

  // useEffect(() => {
  //   switch (currentPhase) {
  //     case 'email':
  //       if (formState.dirtyFields.email) {
  //         setIsSubmitDisabled(false);
  //       } else {
  //         setIsSubmitDisabled(true);
  //       }
  //       break;
  //     case 'verify':
  //       console.log(getValues('verifyCode'));
  //       if (
  //         formState.dirtyFields.verifyCode &&
  //         getValues('verifyCode').length === 6
  //       ) {
  //         setIsSubmitDisabled(false);
  //       } else {
  //         setIsSubmitDisabled(true);
  //       }
  //       break;
  //     default:
  //       setIsSubmitDisabled(true);
  //   }
  // }, [currentPhase, formState, getValues]);

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <p>{formState.errors.confirmPassword?.message}</p>
        <TextField
          register={register('email')}
          type="email"
          placeholder="이메일"
          disabled={currentPhase !== 'email'}
        />
        {currentPhase === 'verify' && (
          <TextField
            register={register('verifyCode', { pattern: /^[0-9]{6}$/ })}
            type="number"
            placeholder="인증번호"
            align="center"
          />
        )}
        {currentPhase === 'password' && (
          <>
            <TextField
              register={register('password')}
              type="password"
              placeholder="비밀번호"
            />
            <TextField
              register={register('confirmPassword', {
                validate: (value) => value === getValues('password'),
              })}
              type="password"
              placeholder="비밀번호 확인"
            />
          </>
        )}
        <Button
          type="submit"
          sort="primary"
          width="100%"
          fontWeight="700"
          disabled={isSubmitDisabled}
        >
          {
            {
              email: '인증번호 받기',
              verify: '인증하기',
              password: '가입하기',
            }[currentPhase]
          }
        </Button>
        <Lines>
          <Line />
          <MidLineTextDiv>또는</MidLineTextDiv>
          <Line />
        </Lines>
        <KaKaoBtn type="button">
          <KaKaoDiv onClick={login}>
            <KaKaoImg src={kaKao} alt="s" />
            <span>Kakao로 가입하기</span>
          </KaKaoDiv>
        </KaKaoBtn>
      </Container>
      <SignUpContents>
        <LeftBtn type="button">이미 계정이 있으신가요?</LeftBtn>
        <Link href="/login">
          <RightBtn type="button">로그인</RightBtn>
        </Link>
      </SignUpContents>
    </>
  );
};

export default RegisterForm;

const ErrorMessage = styled.p`
  padding: 2px 0 2px 8px;
  width: 100%;
  color: ${customColor.danger};
  font-size: 10px;
`;
const ConfirmBox = styled.div`
  height: 57px;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
`;
const KaKaoImg = styled(Image)`
  position: absolute;
  left: 14px;
  width: 17px;
  height: 17px;
`;
const KaKaoDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 100%;
  justify-content: center;
`;
const Container = styled.form`
  justify-content: space-between;
  border: 1px solid ${(prop) => prop.theme.border};
  width: 380px;
  background-color: ${(prop) => prop.theme.cardHeader};
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
const Id = styled.input`
  ${FormInputCss}
`;
const PassWord = styled.input`
  ${FormInputCss}
`;
const ConfirmPassWord = styled.input<{ comparePw: boolean }>`
  ${FormInputCss}
  border: ${({ comparePw, theme }) =>
    comparePw ? `1px solid ${theme.border}` : `2px solid ${theme.danger}`};
`;

const SignUpContents = styled.div`
  display: flex;
  gap: 4px;
  align-items: baseline;
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
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const MidLineTextDiv = styled.div`
  font-size: 10px;
  color: ${customColor.darkGray};
  width: 30px;
  text-align: center;
`;
const KaKaoBtn = styled.button`
  border-radius: 8px;
  border: 1px solid ${(prop) => prop.theme.border};
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
const LeftBtn = styled.button`
  font-size: 12px;
  color: ${(prop) => prop.theme.subText};
`;
const RightBtn = styled.button`
  font-size: 12px;
  color: ${customColor.orange};
  font-weight: 900;
`;
