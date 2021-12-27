import React, { useState } from "react";
import "./Registration.css";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("hidden");
  const [usernameWarning, setUsernameWarning] = useState("hidden");

  const warningClass = "warn";

  function onSubmit(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setPasswordWarning("");
      setUsernameWarning("");
    } else {
      handleNewUser(username, password);
    }
  }

  function handleNewUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users"));
    const newUser = {
      id: users.length + 1,
      username: username,
      password: password,
    };
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")));
  }

  function verifyNoUsernameConflict(username) {
    const users = JSON.parse(localStorage.getItem("users"));
    users.map((user) => {
      if (user.username === username) {
        setUsernameWarning("");
      } else {
        setUsernameWarning("hidden");
      }
    });
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
          onChange={(e) => verifyNoUsernameConflict(e.target.value)}
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
        id="username-warning"
        className={`${usernameWarning} ${warningClass}`}
      >
        Username already exists. Login or register with a different username.
      </span>

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
