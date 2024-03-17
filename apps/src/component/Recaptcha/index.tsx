import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRecaptchaAuth } from "../../hooks/localLogin/useRecaptchaAuth";

interface RecaptchaFormProps {
  ref?: any;
  size?: "invisible" | undefined;
  siteKey: string;
  onChange: any;
}
const ReCAPTCHAForm = ({ ...props }) => {
  const { recaptchaValidate, isSuccess } = useRecaptchaAuth(props.successFn);

  useEffect(() => {
    props.setIsSuccess(isSuccess);
  }, [isSuccess]);

  return (
    <ReCAPTCHA
      sitekey="6LcLDn0pAAAAAK0ek_YMXkkr2ifpoY6j7vg1BfKM"
      onExpired={() => {
        props.setIsSuccess(false);
        props.setOnCaptcha(false);
      }}
      onChange={(token) => token && recaptchaValidate(token)}
    />
  );
};
export default ReCAPTCHAForm;
