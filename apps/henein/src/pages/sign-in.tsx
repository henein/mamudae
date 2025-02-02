import { Logo } from '../component/Logo';
import Link from 'next/link';
import { Typography } from '@henein/components';
import { SignInForm } from '../components/forms/sign-in-form';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-primary-50 dark:bg-grey-900">
      <Logo />
      <SignInForm />
      <div className="flex gap-1 items-baseline">
        <Typography className="text-xs" type="secondary">
          아직 계정이 없으신가요?
        </Typography>
        <Link href="/register">
          <Typography className="text-xs font-bold" type="link">
            회원가입
          </Typography>
        </Link>
        <Typography />
      </div>
    </div>
  );
};

export default SignInPage;
