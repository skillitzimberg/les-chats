import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatForm from "./ChatForm";
import Login from "./Login";
import Messages from "./Messages";
import Registration from "./Registration";
import Users from "./Users";
import { usersData, messagesData } from "./Dummy_Data/chatData";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [users, setUsers] = useState(usersData);
  const [messages, setMessages] = useState(messagesData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleRegistration(newUsername, password) {
    const newUser = {
      id: users.length + 1,
      username: newUsername,
      password: password,
    };
    setUsers([...users, newUser]);
    handleLogin(true);
    window.location.href = "/";
  }

  function handleLogin(loginSuccessful) {
    localStorage.setItem("isLoggedIn", loginSuccessful);
    if (loginSuccessful) {
      console.log("Success!");
      console.log(loginSuccessful);
    } else {
      console.log("Failure!");
      console.log(loginSuccessful);
    }
  }

  function handleNewMessage(message) {
    const newMessage = {
      id: messages.length + 1,
      from: localStorage.getItem("currentUser"),
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
              <PrivateRoute
                isloggedIn={JSON.parse(localStorage.getItem("isLoggedIn"))}
              >
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
