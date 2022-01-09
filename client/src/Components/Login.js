import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

export default function Login({ handleLogin, currentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("hidden");

  function onSubmit(e) {
    e.preventDefault();
    setWarning("hidden");
    if (
      currentUser === null ||
      username !== currentUser.username ||
      password !== currentUser.password
    ) {
      setWarning("");
      handleLogin(false);
    } else {
      handleLogin(true, currentUser);
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
