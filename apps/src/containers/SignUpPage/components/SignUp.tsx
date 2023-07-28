import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import Image from "next/image";
import kaKao from "/public/loginPageImages/KaKao.png";
import Button from "../../../component/Button";
import Link from "next/link";
import { FormInputCss } from "../../LoginPage/components/Login";
import useKaKao from "../../../hooks/kakao/useKaKao";
import { useLocalSignUp } from "../../../hooks/localLogin/useLocalLogin";
import { LocalLoginProps } from "../../../api/localLogin";

const SignUp = () => {
  const [comparePw, setComparePw] = useState(true);
  const { login } = useKaKao();
  const { register, handleSubmit } = useForm();
  const [localSignUpForm, setLocalSignUpForm] = useState<LocalLoginProps>({
    userEmail: "",
    password: "",
  });
  const { mutate } = useLocalSignUp(localSignUpForm);

  const submit = async (data: FieldValues) => {
    setComparePw(
      JSON.stringify(data.password) == JSON.stringify(data.confirmPassword)
    );
    if (comparePw) {
      console.log(data.id, data.password);
      await setLocalSignUpForm({
        userEmail: data.id,
        password: data.password,
      });
      await mutate();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container onSubmit={handleSubmit(submit)}>
      <Title>회원가입</Title>
      <Id
        type="text"
        placeholder="이메일"
        {...register("id")}
        autoComplete="off"
      />
      <PassWord
        type="text"
        placeholder="비밀번호"
        {...register("password")}
        autoComplete="off"
      />
      <ConfirmBox>
        {!comparePw && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        <ConfirmPassWord
          type="text"
          placeholder="비밀번호 확인"
          {...register("confirmPassword")}
          comparePw={comparePw}
          autoComplete="off"
        />
      </ConfirmBox>
      <LoginBtn type="submit" sort="primary" width="100%" fontWeight="700">
        이메일로 가입하기
      </LoginBtn>
      <SignUpContents>
        <LeftBtn type="button">이미 계정이 있으신가요?</LeftBtn>
        <Link href="/login">
          <RightBtn type="button">로그인</RightBtn>
        </Link>
      </SignUpContents>
      <Lines>
        <Line />
        <MidLineTextDiv>또는</MidLineTextDiv>
        <Line />
      </Lines>
      <KaKaoBtn type="button">
        <KaKaoDiv onClick={login}>
          <KaKaoImg src={kaKao} alt="s" />
          <span>KaKao로 가입하기</span>
        </KaKaoDiv>
      </KaKaoBtn>
    </Container>
  );
};

export default SignUp;

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
  height: 450px;
  background-color: ${(prop) => prop.theme.cardHeader};
  display: flex;
  flex-direction: column;
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
const LoginBtn = styled(Button)`
  border: 1px solid ${(prop) => prop.theme.border};
`;

const SignUpContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Lines = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Line = styled.hr`
  width: calc((100% - 30px) / 2);
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
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
