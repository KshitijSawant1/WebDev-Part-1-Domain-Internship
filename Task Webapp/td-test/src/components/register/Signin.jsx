import React from "react";

const Signin = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          {/* Signin Form */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Sign in to your TaskDesk account
            </p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center p-4 bg-gray-200">
            <img
              src="https://ik.imagekit.io/rhzh8en76/TaskDesk/AuthImages/11.jpeg?updatedAt=1752919886705"
              alt="Signup Visual"
              className="w-full h-auto max-h-[400px] object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
