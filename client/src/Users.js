import React from "react";
import "./Users.css";
import SectionHeader from "./SectionHeader";

export default function Users(props) {
  console.log(props);
  return (
    <section id="users">
      <SectionHeader title={"Users Online"} />
      {props.userNames.map((name) => {
        return <div>{name}</div>;
      })}
    </section>
  );
}
