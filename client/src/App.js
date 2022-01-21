import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatForm from "./Components/ChatForm";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Messages from "./Components/Messages";
import PrivateRoute from "./Components/PrivateRoute";
import Registration from "./Components/Registration";
import Users from "./Components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

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

  async function handleLogin(user = null) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    user.isLoggedIn = response.ok;
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(response.ok);
    if (response.ok) window.location.replace("/");
    return response.ok;
  }

  function handleLogout() {
    currentUser.isLoggedIn = false;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setCurrentUser(currentUser);
    window.location.replace("/login");
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
              <PrivateRoute isLoggedIn={currentUser?.isLoggedIn}>
                <section id="sidebar">
                  <Users users={users} />
                </section>
                <section id="chats">
                  <Messages messages={messages} />
                  <ChatForm handleNewMessage={handleNewMessage} />
                  <Logout logout={handleLogout} />
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
