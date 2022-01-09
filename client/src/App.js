import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatForm from "./Components/ChatForm";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import PrivateRoute from "./Components/PrivateRoute";
import Registration from "./Components/Registration";
import Users from "./Components/Users";

function App() {
  console.log("App Rendered");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser?.isLoggedIn);

  useEffect(() => {
    const loadUsers = () => {
      fetch("/api/users")
        .then((resp) => resp.json())
        .then((usrsData) => setUsers(usrsData));
    };
    const loadMessages = () => {
      fetch("/api/messages")
        .then((resp) => resp.json())
        .then((usrsData) => setMessages(usrsData));
    };

    loadUsers();
    loadMessages();
  }, []);

  async function handleRegistration(newUsername, password) {
    const newUser = {
      id: users.length + 1,
      username: newUsername,
      password: password,
    };

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    try {
      if (response.ok) {
        handleLogin(true, await response.json());
      } else {
        handleLogin(false);
        throw new Error(await response.text());
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleLogin(loginSuccessful, user = null) {
    console.log("loginSuccessful:", loginSuccessful);
    if (!!user) {
      user.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
    }
    console.log("loginSuccessful:", loginSuccessful);
    setIsLoggedIn(loginSuccessful);
    window.location.replace("/");
  }

  function handleNewMessage(message) {
    const newMessage = {
      id: messages.length + 1,
      from: currentUser.username,
      text: message,
      timeStamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
  }

  return (
    <main className="App">
      {(console.log(currentUser), console.log(isLoggedIn))}
      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Registration handleRegistration={handleRegistration} />}
          />
          <Route
            path="/login"
            element={
              <Login handleLogin={handleLogin} currentUser={currentUser} />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <section id="sidebar">
                  <Users users={users} />
                </section>
                <section id="chats">
                  <Messages messages={messages} />
                  <ChatForm handleNewMessage={handleNewMessage} />
                </section>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
