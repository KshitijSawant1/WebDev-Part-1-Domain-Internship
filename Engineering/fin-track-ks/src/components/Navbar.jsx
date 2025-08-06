import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartLine, FaHistory } from "react-icons/fa";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      {/* Logo Title - Clickable */}
      <NavLink to="/" className="text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
        FinTrack
      </NavLink>

      {/* Nav Links */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-3">
        <NavLink to="/" className={navLinkClass}>
          <FaHome />
          <span className="hidden sm:inline">Home</span>
        </NavLink>
        <NavLink to="/dashboard" className={navLinkClass}>
          <FaChartLine />
          <span className="hidden sm:inline">Dashboard</span>
        </NavLink>
        <NavLink to="/history" className={navLinkClass}>
          <FaHistory />
          <span className="hidden sm:inline">History</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
