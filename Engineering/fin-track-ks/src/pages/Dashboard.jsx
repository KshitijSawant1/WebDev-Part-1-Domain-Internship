import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center sm:text-left">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Total Balance</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">₹10,000</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Income</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">₹15,000</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Expense</h2>
          <p className="text-2xl font-bold text-red-500 mt-2">₹5,000</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-2 flex justify-between">
            <span>Groceries</span>
            <span className="text-red-500">- ₹500</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Salary</span>
            <span className="text-green-500">+ ₹10,000</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Electricity Bill</span>
            <span className="text-red-500">- ₹1,200</span>
          </li>
          <li className="py-2 flex justify-between">
            <span>Freelance</span>
            <span className="text-green-500">+ ₹5,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
