import { useRouter } from "next/router";
import React from "react";

const useKaKaoHooks = () => {
  const REST_API_KEY = "8301ff81ffe6d565a051b554ceafa147";
  const REDIRECT_URI = "http://localhost:3000/kakao";
  const router = useRouter();
  const login = () => {
    router.push({
      pathname: "https://kauth.kakao.com/oauth/authorize",
      query: {
        response_type: "code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
      },
    });
  };
  return { login };
};

export default useKaKaoHooks;
