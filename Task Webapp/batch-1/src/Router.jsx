import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/hero/Layout";
import Hero from "./components/hero/Hero";
import Signup from "./components/register/Signup";
import Signin from "./components/register/Signin";
import Playground from "./components/pages/Playground";
import Dashboard from "./components/pages/Dashboard";
import PageNotFound from "./components/pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "playground", element: <Playground /> },
      { path: "dashbaord", element: <Dashboard /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
