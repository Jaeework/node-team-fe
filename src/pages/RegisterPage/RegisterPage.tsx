import useRegister from "../../hooks/useRegister";
import EmailSentMessage from "./components/EmailSentMessage/EmailSentMessage";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

const RegisterPage = () => {
  const registerProps = useRegister();

  return (
    <div className="flex min-h-full w-screen items-center justify-center md:py-8">
      <div className="shadow-primary/5 md:border-primary/5 w-full max-w-md bg-white p-8 shadow-xl sm:min-w-md md:rounded-xl md:p-12">
        {registerProps.isEmailSent ? (
          <EmailSentMessage />
        ) : (
          <RegistrationForm {...registerProps} />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
