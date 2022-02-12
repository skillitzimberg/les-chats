import React from "react";
import { logout } from "./auth-utils";

const Logout = ({ setTokenIsValid }) => {
  return (
    <button
      onClick={() => {
        logout(), setTokenIsValid(false);
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
