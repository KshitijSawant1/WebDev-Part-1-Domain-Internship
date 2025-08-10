import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Signin = () => {
  const { session, signInUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An Error Occured in handle Sign In User");
    } finally {
      setLoading(false);
    }
  };
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
            {/*handle submit here */}
            <form onSubmit={handleSignIn} className="space-y-4">
              {/*onChange set Email here */}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {/*onChange set Password here */}
              <input
                onChange={(e) => setPassword(e.target.value)}
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
              {error && (
                <p className="text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3 shadow-sm">
                  {error}
                </p>
              )}
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
