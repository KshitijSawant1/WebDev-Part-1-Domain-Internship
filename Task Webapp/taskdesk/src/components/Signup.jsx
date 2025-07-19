import React from "react";
import { getRandomAuthImage } from "../utils/getRandomAuthImage";
const Signup = () => {
  const imageUrl = getRandomAuthImage();
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl bg-[#DEF4C6] rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Image Section */}
        <div className="flex items-center justify-center p-4 bg-[#DEF4C6]">
          <img
            src={imageUrl}
            alt="Signup Visual"
            className="w-full max-h-[520px] object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Right: Signup Section */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md p-8">
            <h3
              className="text-xl font-semibold text-[#134611] mb-4"
              style={{ fontFamily: "cursive" }}
            >
              Sign-up Page
            </h3>

            <h2 className="text-3xl font-bold text-[#134611] mb-6 text-center">
              Join <span className="text-[#088D45]">TaskDesk</span> Today
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#088D45] transition duration-300 shadow-sm hover:shadow-md"
              />
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
                Sign Up
              </button>
            </form>

            <p className="mt-5 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-[#088D45] font-medium hover:underline"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
