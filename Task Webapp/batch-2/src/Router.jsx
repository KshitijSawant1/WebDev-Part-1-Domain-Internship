import { createBrowserRouter } from "react-router-dom";

import Hero from "./components/hero/Hero";
import Signup from "./components/register/SignUp";
import Signin from "./components/register/Signin";
import Playground from "./components/pages/Playground";
import Dashboard from "./components/pages/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";
import Layout from "./components/hero/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "playground", element: <Playground /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
