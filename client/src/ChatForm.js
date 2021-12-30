import React, { useState } from "react";
import "./ChatForm.css";

const ChatForm = ({ handleNewMessage }) => {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleNewMessage(message);
  }

  return (
    <section id="text-input">
      <form id="new-message" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="message">New Message</label>
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </div>
        <button type="submit" name="submit">
          Enter
        </button>
      </form>
    </section>
  );
};

export default ChatForm;
