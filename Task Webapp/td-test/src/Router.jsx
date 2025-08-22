import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/routing/Layout";
import Hero from "./components/hero/Hero";
import Signup from "./components/register/Signup";
import Signin from "./components/register/Signin";
import XDashboard from "./components/pages/XDashboard";
import SDashboard from "./components/pages/SDashboard";
import PageNotFound from "./components/pages/PageNotFound";
import Calender from "./components/pages/Calender";
import Notes from "./components/pages/Notes";
import Focus from "./components/pages/Focus";
import Playground from "./components/task/Playground";
import PublicOnlyRoute from "./components/routing/PublicOnlyRoute";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import TaskGraph from "./components/pages/TaskGraph";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> }, // public root
      { path: "home", element: <Hero /> }, // <-- add this public route

      // public-only auth pages
      {
        element: <PublicOnlyRoute />,
        children: [
          { path: "signup", element: <Signup /> },
          { path: "signin", element: <Signin /> },
        ],
      },

      // protected
      {
        element: <ProtectedRoute />,
        children: [
          { path: "playground", element: <Playground /> },
          { path: "dashboard", element: <XDashboard /> },
          { path: "sdashboard", element: <SDashboard /> },
          { path: "task-graph", element: <TaskGraph /> },
          { path: "calender", element: <Calender /> },
          { path: "notes", element: <Notes /> },
          { path: "focus", element: <Focus /> },
        ],
      },

      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
