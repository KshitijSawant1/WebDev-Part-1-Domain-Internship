// src/components/routing/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TDLogo from "../../assets/logo/TDLogo1.png";
import { UserAuth } from "../../context/AuthContext";
import { IoShapes } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthed = !!session?.user;

  // Close mobile menu on route change or Esc
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const navItems = ["dashboard", "calender", "focus", "notes", "task-graph"];

  return (
    <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo (always routes to /) */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={TDLogo} className="h-8" alt="TaskDesk logo" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            TaskDesk
          </span>
        </Link>

        {/* Center nav links (desktop only) */}
        {isAuthed && (
          <ul className="hidden md:flex md:space-x-8 font-medium">
            {navItems.map((item) => (
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
        )}

        {/* Right-side actions (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthed && (
            <>
              <Link
                to="/playground"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <IoShapes className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Playground</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <RiLogoutCircleRLine className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </>
          )}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-200 bg-white dark:bg-gray-900">
          {isAuthed && (
            <ul className="flex flex-col p-3 space-y-1 font-medium">
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item}`}
                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}

              {/* CTA buttons in mobile menu */}
              <li className="pt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/playground"
                  className="text-center px-3 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
                >
                  Playground
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
