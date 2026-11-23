import "../../App.css";
import { useState } from "react";
import auth from "../../api/auth";
import authParams from "../../constants/authParam";
import { useAppContext } from "../../context/appProvider";
import { signInAction } from "../../context/actionCreators";
import { useNavigate } from "react-router-dom";
import paths from "../../constants/path";
import { toggleLocalStorage } from "../../utils/jwt";

function SignInForm() {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function userHandler(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function passwordShow(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    auth(user, authParams.signIn)
      .then((data) => {
        const token =
          typeof data === "string"
            ? data
            : data?.token || data?.accessToken || data?.data?.token || null;

        if (!token) {
          throw new Error("The server did not return an authentication token.");
        }

        toggleLocalStorage(token);
        dispatch(signInAction({ token }));
        navigate(paths.Recipes);
      })
      .catch((err) => {
        setError(err?.message || "Sign in failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login_overlay">
      <form className="login_form" onSubmit={submitHandler}>
        <input
          className="email_form"
          value={user.email}
          onChange={userHandler}
          name="email"
          type="email"
          placeholder="Your email address"
          required
        />
        <div>
          <input
            className="password_form"
            value={user.password}
            onChange={userHandler}
            name="password"
            type={inputType}
            placeholder="Password"
            required
          />
          <input
            className="submit_form"
            onChange={passwordShow}
            type="checkbox"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p>{error}</p>}
        <button
          type="button"
          className="signup_button"
          onClick={() => {
            navigate(paths.Sign_up);
          }}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
