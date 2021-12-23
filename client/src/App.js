import React, { useState } from "react";
import "./App.css";
import Users from "./Users";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import Registration from "./Registration";
import { usersData, messagesData } from "./Dummy_Data/chatData";

function App() {
  const [users, setUsers] = useState(usersData);
  const [messages, setMessages] = useState(messagesData);

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

  return (
    <main className="App">
      <Registration handleNewUser={handleNewUser} />
      <section id="sidebar">
        <Users users={users} />
      </section>
      <section id="chats">
        <Messages messages={messages} />
        <ChatForm handleNewMessage={handleNewMessage} />
      </section>
    </main>
  );
}

export default App;
