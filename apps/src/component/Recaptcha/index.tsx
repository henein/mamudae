import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptchaTokenStore from '../../../store/recaptchaTokenSlice/token';

const ReCAPTCHAForm = ({ ...props }) => {
  const { setCaptchaToken, setFail, setSuccess, initToken } =
    useRecaptchaTokenStore();

  return (
    <ReCAPTCHA
      sitekey="6LcLDn0pAAAAAK0ek_YMXkkr2ifpoY6j7vg1BfKM"
      onExpired={() => {
        props.setOnCaptcha(false);
        setFail();
      }}
      onChange={(token) => {
        if (token) {
          setCaptchaToken(token);
          setSuccess();
        } else {
          initToken();
          setFail();
        }
      }}
    />
  );
};
export default ReCAPTCHAForm;
