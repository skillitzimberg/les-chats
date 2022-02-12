import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import { login } from "./auth-utils";

export default function Login({ setTokenIsValid }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("hidden");

  function handleLogin(loginResponse) {
    const tokenExpiration = loginResponse.expiresAt;
    localStorage.setItem("tokenExpiration", tokenExpiration);
    setTokenIsValid(tokenExpiration > Date.now() / 1000);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setWarning("hidden");
    let response = await login({ username, password });
    if (!response.ok) {
      setWarning("");
    } else {
      handleLogin(await response.json());
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
