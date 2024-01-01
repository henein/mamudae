import axios from "axios";

export async function getPrintCode(code: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao?code=${code}`
  );
  return res.headers;
}

export async function getAtByRT(refreshToken: string | null) {
  try {
    const res = await axios.get(`/auth/refresh`, {
      headers: {
        RefreshToken: `${refreshToken}`,
      },
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
}
