import { useMutation, useQuery } from "react-query";
import {
  LocalLoginProps,
  postLocalLogin,
  postLocalSignUp,
} from "../../api/localLogin";
import { useLocalStorage } from "../storage/useLocalStorage";
import { useRouter } from "next/router";

export interface UseLocalLoginProps extends LocalLoginProps {
  options?: any;
}
export const useLocalLogin = ({
  userEmail,
  password,
  options,
}: UseLocalLoginProps) => {
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { mutate } = useMutation(
    ["getLocalLogin"],
    () => postLocalLogin({ password, userEmail }),
    {
      ...options,
      onSuccess: (data) => {
        setLocalStorage("access", data["authorization"]);
        setLocalStorage("refresh", data["refreshtoken"]);
        router.push("/");
      },
      onError: (err: any) => {
        if (err.response.data.code == 404) alert(err.response.data.error);
        else {
          alert("새로고침 후 다시 시도해주세요.");
        }
      },
    }
  );

  return { mutate };
};

export const useLocalSignUp = ({
  userEmail,
  password,
  options,
}: UseLocalLoginProps) => {
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { mutate } = useMutation(
    ["postLocalLogin"],
    () => postLocalSignUp({ userEmail, password }),
    {
      ...options,
      onSuccess: (data) => {
        console.log(data);
        setLocalStorage("access", data["authorization"]);
        setLocalStorage("refresh", data["refreshtoken"]);
        data["status"]
          ? // 첫 로그인일 시
            router.push("/register")
          : // 첫 로그인이 아닐 시
            router.push("/");
      },
      onError: (err: any) => {
        if (err.response.data.code == 409) alert(err.response.data.error);
        else {
          alert("새로고침 후 다시 시도해주세요.");
        }
      },
    }
  );
  return { mutate };
};
