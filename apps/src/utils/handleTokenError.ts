import { AxiosError } from "axios";
import { getAtByRT } from "../api/getPrintCode";

// - AT 만료시 ( 30분 )  code : 101
// - RT 만료시 ( 4일 ) → 로그아웃 code : 102
// - AT가 망가졌을때 → 로그아웃 code : 103

const handleTokenError = async (error: AxiosError, refetch?: any) => {
  const exception = error.response?.headers.exception;
  // console.log(exception);
  const resController = (res: any) => {
    if (res.headers && res.headers.exception == undefined) {
      // then
      localStorage.setItem("access", res.headers.authorization.substring(7));
      if (
        localStorage.getItem("access") == res.headers.authorization.substring(7)
      ) {
        refetch("userInfo");
      }
    } else {
      // catch
      if (res.headers.exception == 102) {
        alert(
          "사용자 세션이 만료되었습니다. 다시 로그인 해주세요. (AT,RT 재발급 요망)"
        );
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        window.location.reload();
      }
    }
  };

  switch (exception) {
    case "101":
      // refresh api 요청
      const refreshToken = localStorage.getItem("refresh");
      const res = await getAtByRT(refreshToken);
      // headers 확인 후 success면 AT 세팅, error면 102에러처리
      console.log(res);
      await resController(res);
      break;
    case "103":
      alert("토큰 값이 변경되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
      break;
    default:
      break;
  }
};
export default handleTokenError;
