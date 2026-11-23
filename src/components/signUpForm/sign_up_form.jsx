import { useState } from "react";
import auth from "../../api/auth";
import { useNavigate } from "react-router-dom";
import paths from "../../constants/path";
import authParams from "../../constants/authParam";

function SignUpForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function userHandler(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    auth(user, authParams.signUp)
      .then(() => {
        navigate(paths.Sign_in, { state: { success: true } });
      })
      .catch((err) => {
        setError(err?.message || "Could not proceed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="login_overlay">
      <form className="login_form" onSubmit={submitHandler}>
        <h1>join us</h1>
        <input
          className="email_form"
          value={user.userName}
          type="text"
          name="userName"
          placeholder="Username"
          onChange={userHandler}
          required
        />

        <input
          className="email_form"
          value={user.email}
          type="email"
          name="email"
          placeholder="Your email address"
          onChange={userHandler}
          required
        />

        <input
          className="password_form"
          value={user.password}
          type="password"
          name="password"
          placeholder="Create a password"
          onChange={userHandler}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {error && <p>{error}</p>}

        <button
          type="button"
          className="signup_button"
          onClick={() => navigate(paths.Sign_in)}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
