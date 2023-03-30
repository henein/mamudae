import { useMutation, useQuery } from "react-query";
import { getPrintCode } from "../../api/getPrintCode";

interface IUsePrintCode {
  code: string;
  options?: any;
}
export const usePrintCode = ({ code, options }: IUsePrintCode) => {
  if (!code) {
    console.log("인자코드가 아직 안불러와졌음");
  }

  const { data, refetch: receivePrintCode } = useQuery(
    ["getToken"],
    () => getPrintCode(code),
    {
      ...options,
      enabled: false,
      onSuccess: (res) => console.log(res),
    }
  );

  return { data, receivePrintCode };
};
