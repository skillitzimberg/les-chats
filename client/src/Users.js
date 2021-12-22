import React from "react";
import "./Users.css";
import SectionHeader from "./SectionHeader";

export default function Users(props) {
  return (
    <section id="users">
      <SectionHeader title={"Users Online"} />
      {props.userNames.map((name) => {
        return <div key={name}>{name}</div>;
      })}
    </section>
  );
}
