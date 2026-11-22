import SignInForm from "../../components/signInForm/signInForm";
import { useLocation } from "react-router-dom";
function Sign_in() {
  const loaction = useLocation();
  return (
    <div>
      <SignInForm />
      {loaction.state?.success && <h1>registered succsesfully</h1>}
    </div>
  );
}
export default Sign_in;
