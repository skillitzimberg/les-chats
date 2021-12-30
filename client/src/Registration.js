import React, { useState } from "react";
import "./Registration.css";

export default function Registration({ handleRegistration }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("hidden");

  const warningClass = "warn";

  function onSubmit(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setPasswordWarning("");
    } else {
      handleRegistration(username, password);
    }
  }

  function verifyPasswordMatch(value) {
    setConfirmPassword(value);
    if (
      (value.length === password.length && value !== password) ||
      value.length > password.length
    ) {
      setPasswordWarning("");
    } else {
      setPasswordWarning("hidden");
    }
  }

  return (
    <form id="register" onSubmit={onSubmit}>
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

      <label htmlFor="confirm">
        Confirm Password
        <input
          id="confirm"
          name="confirm"
          type="password"
          onChange={(e) => verifyPasswordMatch(e.target.value)}
        ></input>
      </label>

      <span
        id="password-warning"
        className={`${passwordWarning} ${warningClass}`}
      >
        Passwords do not match. Please try again.
      </span>

      <button type="submit">Register</button>
    </form>
  );
}
