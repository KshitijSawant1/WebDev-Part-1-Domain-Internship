import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Signup = () => {
  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  // useSate of the Features
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Handle Sign Up New User
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An Error Occured in Handle Sign Up User");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center p-4 bg-gray-200">
            <img
              src="https://i.pinimg.com/1200x/7d/b9/35/7db935fec2550c643f2842ed7f2296cd.jpg"
              alt="Signup Visual"
              className="w-full h-auto max-h-[400px] object-cover rounded-md"
            />
          </div>
          {/* Signup Form */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Create Your Account
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Join TaskDesk and boost your productivity
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
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
                Sign Up
              </button>
              {error && (
                <p
                  className="text-center text-sm font-medium text-red-700 
                bg-red-100 border border-red-300 rounded-md px-4 py-3 
                shadow-md"
                >
                  {error}
                </p>
              )}
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/signin" className="text-green-600 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
