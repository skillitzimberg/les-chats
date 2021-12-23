import React from "react";
import "./Users.css";
import SectionHeader from "./SectionHeader";

export default function Users({ users }) {
  return (
    <section id="users">
      <SectionHeader title={"Users Online"} />
      {users.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </section>
  );
}
