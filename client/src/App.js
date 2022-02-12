import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { tokenIsExpired } from "./Components/auth-utils";
import ChatForm from "./Components/ChatForm";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Messages from "./Components/Messages";
import PrivateRoute from "./Components/PrivateRoute";
import Registration from "./Components/Registration";
import Users from "./Components/Users";

function App() {
  const [tokenIsValid, setTokenIsValid] = useState(!tokenIsExpired());

  async function handleRegistration(username, password) {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    try {
      if (response.ok) {
        handleLogin(await response.json());
      } else {
        throw new Error(await response.text());
      }
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  }

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Registration handleRegistration={handleRegistration} />}
          />
          <Route
            path="/"
            element={
              !tokenIsValid ? (
                <Login setTokenIsValid={setTokenIsValid} />
              ) : (
                <Home setTokenIsValid={setTokenIsValid} />
              )
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
