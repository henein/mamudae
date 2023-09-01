import axios from "axios";
import { getAtByRT } from "./getPrintCode";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  // timeout: 1000,
});

// req 요청 시 토큰 인증이 들어간다면, 사용될 로직 -> ex) 헤더에 값을 넣어주는것
axiosInstance.interceptors.request.use(
  //요청을 보내기 전에 수행할 일
  async (config) => {
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    const accessToken = localStorage.getItem("access") || "";
    config.headers.Authorization = `${accessToken}`;

    return config;
  },
  (error) => {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// get 요청 시 토큰 인증이 들어간다면, 사용될 로직
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }

    return response;
  },
  async (error) => {
    console.log(error);
    const exception = error.response?.data.code;
    console.log(exception);

    if (exception === 101) {
      const refreshToken = localStorage.getItem("refresh");
      const newAt = await getAtByRT(refreshToken);
      await localStorage.setItem("access", newAt.headers.authorization);
      const accessToken = await localStorage.getItem("access");
      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config);
      return response;
    } else if (exception == 102) {
      alert("사용자 세션이 만료되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
    } else if (exception == 103) {
      alert("토큰 값이 변경되었습니다. 다시 로그인 해주세요.");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
    } else if (exception == 104) {
      alert("로그인 페이지로 이동합니다.");
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.href = "/login";
    } else {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
