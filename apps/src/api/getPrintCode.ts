import axios from "axios";

export async function getPrintCode(code: string) {
  console.log(code);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao?code=${code}`
  );
  console.log(res);
  return res.headers;
}

export async function getAtByRT(refreshToken: string | null) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  return res.data;
}
