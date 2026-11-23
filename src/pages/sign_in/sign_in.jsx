import SignInForm from "../../components/signInForm/signInForm";
import { useLocation } from "react-router-dom";

function Sign_in() {
  const location = useLocation();

  return (
    <div>
      <SignInForm />
      {location.state?.success && (
        <p className="signup_success">Registered successfully. You can sign in now.</p>
      )}
    </div>
  );
}

export default Sign_in;
