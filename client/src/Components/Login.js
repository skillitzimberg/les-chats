import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("hidden");

  async function onSubmit(e) {
    e.preventDefault();
    setWarning("hidden");
    let loginOK = await handleLogin({ username, password });
    if (!loginOK) {
      setWarning("");
    } else {
      window.location.replace("/");
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
