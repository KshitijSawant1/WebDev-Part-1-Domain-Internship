// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router"; 

const App = () => {
  return (
    <div className="font-sans">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
