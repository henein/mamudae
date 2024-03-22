import axios from "axios";

export interface LocalLoginProps {
  email: string;
  password: string;
}

export async function postLocalLogin({ email, password }: LocalLoginProps) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      userEmail: email,
      password: password,
    }
  );
  return res.headers;
}

export async function postLocalRegister({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/register`,
    {
      userEmail: email,
      password,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.headers;
}

export async function postAuthenticationMail(email: string) {
  const formData = new FormData();

  formData.append("requestEmail", email);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/mail/sender`,
    formData
  );

  return res.data;
}

export async function postVerifyCode(code: string) {
  const formData = new FormData();

  formData.append("key", code);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/mail/verify`,
    formData
  );

  return res.headers["authorization"];
}

export const recaptchaTokenAuth = async (token: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/captcha?value=${token}`
  );
  return res;
};
