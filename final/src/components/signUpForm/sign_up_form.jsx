import { useState } from "react";
import auth from "../../api/auth";
function SignUpForm() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  function userHandler(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    auth(user).then().catch().finally(setLoading(false));
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        value={user.userName}
        type="text"
        name="userName"
        onChange={userHandler}
      />
      <input
        value={user.email}
        type="email"
        name="email"
        onChange={userHandler}
      />
      <input
        value={user.password}
        type="password"
        name="password"
        onChange={userHandler}
      />
      <button type="submit">submit</button>
      {loading && <h1>Loadding...</h1>}
    </form>
  );
}

export default SignUpForm;
