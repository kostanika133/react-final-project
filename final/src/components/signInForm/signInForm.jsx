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
  const { state, dispatch } = useAppContext();
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
    <form onSubmit={submitHandler}>
      <input
        value={user.email}
        onChange={userHandler}
        name="email"
        type="email"
      />
      <div>
        <input
          value={user.password}
          onChange={userHandler}
          name="password"
          type={inputType}
        />
        <input onChange={passwordShow} type="checkbox" />
      </div>
      <button type="submit">submit</button>
      {loading && <h1>Loading...</h1>}
      {error && <p>{error}</p>}
    </form>
  );
}

export default SignInForm;
