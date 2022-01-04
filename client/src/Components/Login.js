import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Login.css";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("hidden");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setWarning("hidden");
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    console.log(registeredUser);
    if (
      registeredUser === null ||
      username !== registeredUser.username ||
      password !== registeredUser.password
    ) {
      setWarning("");
      handleLogin(false);
    } else {
      console.log(username, password);
      localStorage.setItem("currentUser", username);
      navigate("/");
      handleLogin(true);
    }
  }

  return (
    <form id="login" onSubmit={onSubmit}>
      <label htmlFor="username">
        Username
        <input
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>

      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </label>

      <span id="warn" className={warning}>
        Invalid log in credentials. Please <Link to="/register">register</Link>{" "}
        or try again.
      </span>

      <button type="submit">Log In</button>
    </form>
  );
}
