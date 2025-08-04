import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists, render children (protected component)
  return children;
}
