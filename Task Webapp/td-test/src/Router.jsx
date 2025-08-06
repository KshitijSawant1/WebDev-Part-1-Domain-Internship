import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/hero/Hero";
import Signup from "./components/register/Signup";
import Signin from "./components/register/Signin";
import Dashboard from "./components/pages/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";
import Playground from "./components/pages/Playground";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "playground", element: <Playground /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
