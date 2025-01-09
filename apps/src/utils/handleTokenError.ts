import { AxiosError } from "axios";
import { getAtByRT } from "../api/getPrintCode";

interface ErrorResponse {
  code: number;
  message: string;
}
// - AT 만료시 ( 30분 )  code : 101 => refresh 요청 후 새로 발급받은 AT localStorage "access"에 저장 => 후에 자동 refetch
// - RT 만료시 ( 4일 ) → 로그아웃 code : 102 => 101번을 요청 한 후에 refresh가 실패했을때(refresh토큰 만료시) localStorage에 있는 "access" "refresh" 삭제
// - AT가 망가졌을때 → 로그아웃 code : 103 => localStorage에 있는 "access" "refresh" 삭제

const handleTokenError = async (
  error: AxiosError<ErrorResponse>,
  refetch?: any
) => {
  const exception = error.response?.data.code;

  const resController = (accessToken: string) => {
    if (accessToken) {
      localStorage.setItem("access", accessToken.substring(7));
      refetch("userInfo");
    }
  };
  const removeToken = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location.reload();
  };

  switch (exception) {
    case 101:
      // refresh api 요청
      const refreshToken = localStorage.getItem("refresh");
      const res = await getAtByRT(refreshToken);
      await resController(res.headers.authorization);
      break;
    case 102:
      alert("사용자 세션이 만료되었습니다. 다시 로그인 해주세요.");
      removeToken();
    case 103:
      alert("토큰 값이 변경되었습니다. 다시 로그인 해주세요.");
      removeToken();
      break;
    default:
      break;
  }
};
export default handleTokenError;
