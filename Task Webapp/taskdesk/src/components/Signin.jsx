import React from "react";

import { getRandomAuthImage } from "../utils/getRandomAuthImage";
const Signin = () => {
  const imageUrl = getRandomAuthImage();
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl bg-[#DEF4C6] rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Signin Form */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md p-8 ">
            <h3
              className="text-xl font-semibold font-cursive text-[#134611] mb-4 "
              style={{ fontFamily: "cursive" }}
            >
              Sign-in Page
            </h3>

            <h2 className="text-3xl font-bold text-[#134611] mb-6 text-center">
              Welcome Back to <span className="text-[#088D45]">TaskDesk</span>
            </h2>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088D45] transition duration-300 shadow-sm hover:shadow-md"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088D45] transition duration-300 shadow-sm hover:shadow-md"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#088D45] text-white font-semibold rounded-lg hover:bg-[#06753a] transition duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-[#088D45] font-medium hover:underline"
              >
                Create one here
              </a>
            </p>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="flex items-center justify-center p-4 bg-[#DEF4C6]">
          <img
            src={imageUrl}
            alt="Signin Visual"
            className="w-full max-h-[520px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
