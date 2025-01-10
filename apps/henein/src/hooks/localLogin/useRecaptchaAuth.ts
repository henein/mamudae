import { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { recaptchaTokenAuth } from "../../api/localLogin";

export const useRecaptchaAuth = (successFn: any) => {
  const { mutateAsync: recaptchaValidate, isSuccess } = useMutation(
    ["recaptcha"],
    (token: string) => recaptchaTokenAuth(token),
    {
      onSuccess: () => {
        alert("reCaptcha 인증을 통과하였습니다. 로그인 버튼을 눌러주세요.");
      },
      onError: () => {
        throw new Error("recaptcha validation Error");
      },
    }
  );

  return { recaptchaValidate, isSuccess };
};
