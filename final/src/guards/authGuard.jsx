import paths from "../constants/path";
import { useAppContext } from "../context/appProvider";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { state } = useAppContext();
  return (
    <div>
      {state.isAuthenticated ? (
        children
      ) : (
        <div>
          <h1>you are not authenticated</h1>
          <button onClick={() => navigate(paths.Sign_up)}>Sign up</button>
          <button onClick={() => navigate(paths.Sign_in)}>Sign in</button>
        </div>
      )}
    </div>
  );
}

export default AuthGuard;
