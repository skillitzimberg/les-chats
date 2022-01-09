import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ isloggedIn, children }) {
  console.log("PrivateRoute says:", isloggedIn);
  return isloggedIn ? children : <Navigate to="/login" />;
}
