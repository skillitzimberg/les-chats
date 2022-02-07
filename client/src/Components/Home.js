import React from "react";

import ChatForm from "./ChatForm";
import Logout from "./Logout";
import Messages from "./Messages";
import Users from "./Users";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

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
    <>
      <section id="sidebar">
        <Users users={users} />
      </section>
      <section id="chats">
        <Messages messages={messages} />
        <ChatForm handleNewMessage={handleNewMessage} />
        <Logout />
      </section>
    </>
  );
}
