import axios from "axios";

export async function getPrintCode(code: string) {
  console.log(code);
  const res = await axios.get(
    ` https://henesysback.shop:8081/auth/login/kakao?code=${code}`
  );
  return res.data;
}