import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import styled from "styled-components";
import {
  postAuthenticationMail,
  postLocalRegister,
  postVerifyCode,
} from "../../../api/localLogin";
import Button from "../../../component/Button";
import { TextField } from "../../../component/TextField";
import kaKao from "/public/loginPageImages/kakao.svg";
import { customColor } from "../../../constants/customColor";
import KakaoBtn from "../../../component/KakaoBtn";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  verifyCode: string;
}

type RegisterPhase = "email" | "verify" | "password";

const RegisterForm = () => {
  const [currentPhase, setCurrentPhase] = useState<RegisterPhase>("email");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [token, setToken] = useState("");

  const { register, getValues, handleSubmit, formState } =
    useForm<RegisterFormInputs>();

  const onSubmit = async (data: FieldValues) => {
    switch (currentPhase) {
      case "email": {
        try {
          await postAuthenticationMail(data.email);
        } catch (error) {
          alert(error);
          return;
        }

        setCurrentPhase("verify");
        break;
      }
      case "verify": {
        try {
          setToken(await postVerifyCode(data.verifyCode));
        } catch (error) {
          alert(error);
          return;
        }

        setCurrentPhase("password");
        break;
      }
      case "password":
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

  useEffect(() => {
    switch (currentPhase) {
      case "email":
        if (formState.dirtyFields.email) {
          setIsSubmitDisabled(false);
        } else {
          setIsSubmitDisabled(true);
        }
        break;
      case "verify":
        if (
          formState.dirtyFields.verifyCode &&
          getValues("verifyCode").length === 6
        ) {
          setIsSubmitDisabled(false);
        } else {
          setIsSubmitDisabled(true);
        }
        break;
      case "password":
        if (
          formState.dirtyFields.password &&
          formState.dirtyFields.confirmPassword &&
          getValues("password") === getValues("confirmPassword")
        ) {
          setIsSubmitDisabled(false);
        } else {
          setIsSubmitDisabled(true);
        }
        break;
      default:
        setIsSubmitDisabled(true);
    }
  }, [currentPhase, formState, getValues]);

  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        {/* <p>{formState.errors.confirmPassword?.message}</p> */}
        <TextField
          register={register("email")}
          type="email"
          placeholder="이메일"
          disabled={currentPhase !== "email"}
        />
        {currentPhase === "verify" && (
          <TextField
            register={register("verifyCode", { pattern: /^[0-9]{6}$/ })}
            type="number"
            placeholder="인증번호"
          />
        )}
        {currentPhase === "password" && (
          <>
            <TextField
              register={register("password")}
              type="password"
              placeholder="비밀번호"
            />
            <TextField
              register={register("confirmPassword", {
                validate: (value) => value === getValues("password"),
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
              email: "인증번호 받기",
              verify: "인증하기",
              password: "가입하기",
            }[currentPhase]
          }
        </Button>
        <Lines>
          <Line />
          <MidLineTextDiv>또는</MidLineTextDiv>
          <Line />
        </Lines>
        <KakaoBtn />
      </Container>
    </>
  );
};

export default RegisterForm;

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
