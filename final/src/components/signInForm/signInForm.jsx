import { useState } from "react";

function SignInForm() {
  const [inputType, setInputType] = useState("password");
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
    </form>
  );
}

export default SignInForm;
