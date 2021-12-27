import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatForm from "./ChatForm";
import Login from "./Login";
import Messages from "./Messages";
import Registration from "./Registration";
import Users from "./Users";
import { usersData, messagesData } from "./Dummy_Data/chatData";

function App() {
  const [users, setUsers] = useState(usersData);
  const [messages, setMessages] = useState(messagesData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleNewUser(username, password) {
    const newUser = {
      id: users.length + 1,
      username: username,
      password: password,
    };
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")));
  }

  function handleLogin(loginSuccessful) {
    setIsLoggedIn(loginSuccessful);
    if (loginSuccessful) {
      window.location.href = "/";
    } else {
      console.log("Failure!");
      console.log(isLoggedIn);
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
            element={<Registration handleNewUser={handleNewUser} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <>
                <section id="sidebar">
                  <Users users={users} />
                </section>
                <section id="chats">
                  <Messages messages={messages} />
                  <ChatForm handleNewMessage={handleNewMessage} />
                </section>
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
