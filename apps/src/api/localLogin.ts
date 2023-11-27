import axios from 'axios';

export interface LocalLoginProps {
  userEmail: string;
  password: string;
}

export async function postLocalLogin({ userEmail, password }: LocalLoginProps) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      userEmail: userEmail,
      password: password,
    }
  );
  return res.headers;
}

export async function postLocalSignUp({
  userEmail,
  password,
}: LocalLoginProps) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/register`,
    {
      userEmail: userEmail,
      password: password,
    }
  );
  return res.headers;
}

export async function sendAuthenticationMail(email: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/mail/naver`,
    {
      requestEmail: email,
    }
  );

  console.log(res.data);

  return res.data;
}
