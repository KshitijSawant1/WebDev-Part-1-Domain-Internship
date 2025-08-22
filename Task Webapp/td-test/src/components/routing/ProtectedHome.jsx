// src/components/ProtectedHome.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import Hero from "../hero/Hero";

const ProtectedHome = () => {
  const { session } = UserAuth();
  if (session?.user) {
    return <Navigate to="/playground" replace />;
  }
  return <Hero />;
};

export default ProtectedHome;
