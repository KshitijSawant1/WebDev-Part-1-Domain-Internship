// src/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import Landing from "./Hero/LandingBasic";
import Dashboard from "./main/Dashboard";
import Playground from "./main/Playground";
import Signin from "./Signin";
import Signup from "./Signup";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "playground", element: <Playground /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
