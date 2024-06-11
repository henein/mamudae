import { ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptchaTokenStore from '../../../../store/recaptchaTokenSlice/token';
import { Wrapper } from '../Portal';

const PortalWrapper = ({ children }: { children: ReactElement }) => {
  const root = document.getElementById('captcha-portal');
  return root && createPortal(<Wrapper>{children}</Wrapper>, root);
};

const ReCAPTCHAForm = () => {
  const { setCaptchaToken, initToken, close } = useRecaptchaTokenStore();

  return (
    <PortalWrapper>
      <ReCAPTCHA
        sitekey="6LcLDn0pAAAAAK0ek_YMXkkr2ifpoY6j7vg1BfKM"
        onExpired={close}
        onChange={(token) => {
          if (token) {
            setCaptchaToken(token);
          } else {
            initToken();
            close();
          }
        }}
      />
    </PortalWrapper>
  );
};
export default ReCAPTCHAForm;
