import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ isLoggedIn, children }) {
  console.log("PrivateRoute says:", isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
