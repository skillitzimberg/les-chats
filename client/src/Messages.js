import React from "react";
import "./Messages.css";
import SectionHeader from "./SectionHeader";

const Messages = ({ messages }) => {
  return (
    <section id="messages">
      <SectionHeader title={"Messages"} />
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.username}: {message.text}
          </div>
        );
      })}
    </section>
  );
};

export default Messages;
