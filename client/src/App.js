import React, { useState } from "react";
import "./App.css";
import Users from "./Users";
import Messages from "./Messages";
import ChatForm from "./ChatForm";
import userData from "./Dummy_Data/userData";

function App() {
  const [data, setData] = useState(userData);

  function handleNewMessage(message) {
    data[0].messages.push({ timeStamp: Date.now(), text: message });
    setData(data);
    console.log(data);
  }

  return (
    <main className="App">
      <section id="sidebar">
        <Users userNames={userNames(data)} />
      </section>
      <section id="chats">
        <Messages userData={data} />
        <ChatForm handleNewMessage={handleNewMessage} />
      </section>
    </main>
  );
}

const userNames = (userData) =>
  userData.map((user) => {
    return user.name;
  });

export default App;
