import ReCAPTCHA from "react-google-recaptcha";

const ReCAPTCHAForm = () => {
  return (
    <>
      <ReCAPTCHA
        sitekey="6LcLDn0pAAAAAK0ek_YMXkkr2ifpoY6j7vg1BfKM"
        onChange={(e) => {
          console.log(e);
        }}
      />
    </>
  );
};
export default ReCAPTCHAForm;
