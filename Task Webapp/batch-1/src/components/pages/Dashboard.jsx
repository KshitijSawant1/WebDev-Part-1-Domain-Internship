import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error Signing Out User | ", error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 
    px-4 "
    >
      <div
        className=" w-full max-w-md bg-white shadow-lg rounded-lg p-6 
      text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back !
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Signed In as
          <span className="font-medium text-green-600">
            {session?.user?.email}
          </span>
        </p>
        {/*const { session,signOut } = UserAuth(); up above make the chnages*/}
        <button
          onClick={handleSignOut}
          className="inline-block px-6 py-2 text-sm font-semibold text-white 
        bg-red-600 rounded hover:bg-red-700 transition"
          aria-label="Sign Out Of Your Account"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
