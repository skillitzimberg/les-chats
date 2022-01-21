import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("PrivateRoute says:", currentUser?.isLoggedIn);
  return currentUser?.isLoggedIn ? children : <Navigate to="/login" />;
}
