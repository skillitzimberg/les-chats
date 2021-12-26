import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./Users";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import Registration from "./Registration";
import { usersData, messagesData } from "./Dummy_Data/chatData";
import Login from "./Login";

function App() {
  const [users, setUsers] = useState(usersData);
  const [messages, setMessages] = useState(messagesData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleNewMessage(message) {
    const newMessage = { timeStamp: Date.now(), text: message };
    setMessages([...messages, newMessage]);
  }

  function handleNewUser(username, password) {
    const newUser = {
      id: users.length + 1,
      username: username,
      password: password,
    };
    setUsers([...users, newUser]);
    console.log(users);
  }

  function handleLogin(loginSuccessful) {
    setIsLoggedIn(loginSuccessful);
    if (isLoggedIn) {
      console.log("Success!");
      console.log(isLoggedIn);
    } else {
      console.log("Failure!");
      console.log(isLoggedIn);
    }
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
