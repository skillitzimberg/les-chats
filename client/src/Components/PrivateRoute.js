import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ isloggedIn, children }) {
  return isloggedIn ? children : <Navigate to="/login" />;
}
