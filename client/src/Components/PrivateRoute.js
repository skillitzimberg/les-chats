import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ isloggedIn, children }) {
  console.log("PrivateRoute: user is logged in", isloggedIn);
  return isloggedIn ? children : <Navigate to="/login" />;
}
