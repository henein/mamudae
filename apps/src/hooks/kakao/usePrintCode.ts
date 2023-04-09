import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPrintCode } from "../../api/getPrintCode";
import { useLocalStorage } from "../storage/useLocalStorage";

interface IUsePrintCode {
  code: string;
  options?: any;
}
export const usePrintCode = ({ code, options }: IUsePrintCode) => {
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  if (!code) {
    console.log("인자코드가 아직 안불러와졌음");
  }

  const { data, refetch: receivePrintCode } = useQuery(
    ["getToken"],
    () => getPrintCode(code),
    {
      ...options,
      enabled: false,
      onSuccess: (data) => {
        console.log(data);
        setLocalStorage("access", data["access_token"].substring(7));
        setLocalStorage("refresh", data["refresh_token"].substring(7));
        router.push("/");
      },
    }
  );

  return { data, receivePrintCode };
};
