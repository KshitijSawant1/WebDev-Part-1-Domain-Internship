import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { session } = UserAuth();
  if (session === undefined) return null; // still resolving auth (optional: show a spinner)
  return session?.user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
