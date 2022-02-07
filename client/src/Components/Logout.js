import React from "react";

import { logout } from "./auth-utils";

const Logout = () => {
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
