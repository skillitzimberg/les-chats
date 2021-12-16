import React from "react";
import "./Messages.css";
import SectionHeader from "./SectionHeader";

const Messages = ({ userData }) => {
  return (
    <section id="messages">
      <SectionHeader title={"Messages"} />
      {userData.map((user) => {
        return messagesByTime(userData).map((message) => (
          <div>
            {user.name}:{message.text}
          </div>
        ));
      })}
    </section>
  );
};

function messagesByTime(users) {
  const allMessages = users
    .map((user) => user.messages.map((message) => message))
    .flat();

  const messagesByTime = allMessages.sort((a, b) => {
    return a.timeStamp - b.timeStamp;
  });

  return messagesByTime;
}

export default Messages;
