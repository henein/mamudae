import { useMutation, useQuery } from 'react-query';
import {
  LocalLoginProps,
  postLocalLogin,
  postLocalRegister,
} from '../../api/localLogin';
import { useLocalStorage } from '../storage/useLocalStorage';
import { useRouter } from 'next/navigation';

export interface UseLocalLoginProps extends LocalLoginProps {
  options?: any;
}
export const useLocalLogin = ({
  email: userEmail,
  password,
  options,
}: UseLocalLoginProps) => {
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { mutate } = useMutation(
    ['getLocalLogin'],
    () => postLocalLogin({ password, email: userEmail }),
    {
      ...options,
      onSuccess: (data) => {
        setLocalStorage('access', data['authorization']);
        setLocalStorage('refresh', data['refreshtoken']);
        router.push('/');
      },
      onError: (err: any) => {
        alert(err.response.data.error);
      },
    }
  );

  return { mutate };
};

export const useLocalSignUp = ({
  email,
  password,
  options,
}: UseLocalLoginProps) => {
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  const { mutate } = useMutation(
    ['postLocalLogin'],
    () => postLocalRegister({ email, password }),
    {
      ...options,
      onSuccess: (data) => {
        console.log(data);
        setLocalStorage('access', data['authorization']);
        setLocalStorage('refresh', data['refreshtoken']);
        // data["status"]
        //   ? // 첫 로그인일 시
        //     router.push("/register")
        //   : // 첫 로그인이 아닐 시
        router.push('/');
      },
      onError: (err: any) => {
        alert(err.response.data.error);
      },
    }
  );
  return { mutate };
};
