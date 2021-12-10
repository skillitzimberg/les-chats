import React from "react";
import "./SectionHeader.css";

const SectionHeader = (props) => {
  return <div className="header">{props.title}</div>;
};

export default SectionHeader;
