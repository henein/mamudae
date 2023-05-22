import { AxiosError } from "axios";
import { getAtByRT } from "../api/getPrintCode";

// - AT 만료시 ( 30분 )  code : 101
// - RT 만료시 ( 4일 ) → 로그아웃 code : 102
// - AT가 망가졌을때 → 로그아웃 code : 103

const handleTokenError = (error: AxiosError) => {
  const exception = error.response?.headers.exception;
  console.log(exception);

  switch (exception) {
    case "101":
      // refresh 요청 안되고있음 고쳐야함
      alert("토큰 값 만료. 다시 로그인 해주세요.");
      const refreshToken = localStorage.getItem("refresh");
      getAtByRT(refreshToken);
      break;
    case "102":
      alert(
        "사용자 세션이 만료되었습니다. 다시 로그인 해주세요. (AT,RT 재발급 요망)"
      );
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
      break;
    case "103":
      alert("토큰 값이 변경되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
      break;
    default:
      alert("백엔드 에러 or 네트워크 에러");
      break;
  }
};
export default handleTokenError;
