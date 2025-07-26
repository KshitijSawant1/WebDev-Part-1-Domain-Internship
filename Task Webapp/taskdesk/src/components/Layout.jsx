// src/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  //  const hideNavbar = location.pathname === "/playground"; // adjust if route differs
  //      {!hideNavbar && <Navbar />}
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
