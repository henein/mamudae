import { useMutation } from 'react-query';
import { LocalLoginProps, postLocalLogin } from '../../api/localLogin';
import { useLocalStorage } from '../storage/useLocalStorage';
import { useRouter } from 'next/navigation';
import useRecaptchaTokenStore from '../../../store/recaptchaTokenSlice/token';

export interface UseLocalLoginProps extends LocalLoginProps {
  options?: any;
}
export const useLocalLogin = () => {
  const router = useRouter();

  const { setLocalStorage } = useLocalStorage();
  const { initToken, close } = useRecaptchaTokenStore();

  const { mutate } = useMutation(
    ['getLocalLogin'],
    ({ email: userEmail, password, captchaValue: token }: UseLocalLoginProps) =>
      postLocalLogin({ password, email: userEmail, captchaValue: token }),
    {
      onSuccess: (data) => {
        setLocalStorage('access', data['authorization']);
        setLocalStorage('refresh', data['refreshtoken']);
        router.push('/');
      },
      onError: (err: any) => {
        initToken();
        close();
        alert(err.response.data.errorMessage);
      },
    }
  );

  return { mutate };
};
