import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatForm from "./Components/ChatForm";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  function handleRegistration(newUsername, password) {
    const newUser = {
      id: users.length + 1,
      username: newUsername,
      password: password,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((userData) => {
        console.log("Registered:", userData);
        setUsers([...users, userData]);
        localStorage.setItem("currentUser", JSON.stringify(userData));
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleLogin(true);
  }

  function handleLogin(loginSuccessful) {
    setIsLoggedIn(loginSuccessful);
    if (loginSuccessful) {
      console.log("Login Success:", loginSuccessful);
    } else {
      console.log("Login Failure:", loginSuccessful);
    }
  }

  function handleNewMessage(message) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Registration handleRegistration={handleRegistration} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <PrivateRoute isloggedIn={isLoggedIn}>
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
