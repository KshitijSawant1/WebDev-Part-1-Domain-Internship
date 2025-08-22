import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const PublicOnlyRoute = () => {
  const { session } = UserAuth();
  if (session === undefined) return null;
  return session?.user ? <Navigate to="/playground" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
