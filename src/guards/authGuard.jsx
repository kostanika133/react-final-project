import paths from "../constants/path";
import { useAppContext } from "../context/appProvider";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { state } = useAppContext();

  return (
    <div className="auth_guard">
      {state.isAuthenticated ? (
        children
      ) : (
        <div className="auth_message">
          <h1 className="auth_title">You are not authenticated</h1>
          <h2 className="auth_subtitle">You may:</h2>

          <div className="auth_actions">
            <button
              className="auth_button"
              onClick={() => navigate(paths.Sign_up)}
            >
              Sign up
            </button>

            <p className="auth_or">or</p>

            <button
              className="auth_button"
              onClick={() => navigate(paths.Sign_in)}
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthGuard;
