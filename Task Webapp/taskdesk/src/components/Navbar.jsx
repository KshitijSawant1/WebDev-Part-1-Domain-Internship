import React from "react";
import { Link } from "react-router-dom";
import TDLogo from "../assets/logo/TDLogo1.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={TDLogo} className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            TaskDesk
          </span>
        </Link>

        {/* CTA Button */}
        <div className="flex items-center space-x-4 md:order-2">
          <Link
            to="/playground"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Playground
          </Link>

          {/* Mobile Menu Toggle (Optional) */}
          <button
            data-collapse-toggle="navbar-menu"
            className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle Menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className="hidden md:flex md:items-center w-full md:w-auto md:order-1"
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 font-medium">
            {["signin", "signup", "dashboard"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="block px-3 py-2 rounded hover:text-blue-700 text-gray-900 dark:text-white dark:hover:text-blue-500"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
