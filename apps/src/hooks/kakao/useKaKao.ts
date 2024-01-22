import { useRouter } from 'next/navigation';

const useKaKao = () => {
  const router = useRouter();
  const login = () => {
    router.push(process.env.NEXT_PUBLIC_PATHNAME ?? '', {
      query: {
        response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      },
    });
  };
  return { login };
};

export default useKaKao;
