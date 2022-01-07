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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser", currentUser);
    if (
      currentUser === null ||
      username !== currentUser.username ||
      password !== currentUser.password
    ) {
      setWarning("");
      handleLogin(false);
    } else {
      localStorage.setItem("currentUser", username);
      handleLogin(true);
      navigate("/");
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
