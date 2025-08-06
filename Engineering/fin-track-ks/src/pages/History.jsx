import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Addtransaction from "../components/Addtransaction";

const History = () => {
  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "Expense",
      label: "Grocery Shopping",
      amount: 800,
      date: "2025-08-01",
    },
  ];

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">History</h1>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">{txn.label}</p>
                <p className="text-sm text-gray-500">{txn.date}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col text-right">
                <span
                  className={`text-sm font-medium ${
                    txn.type === "Income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {txn.type}
                </span>
                <span className="text-lg font-bold text-gray-700">
                  ₹{txn.amount}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 italic">No transactions found.</p>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300"
        aria-label="Add Transaction"
        onClick={() => setShowModal(true)}
      >
        <FaPlus />
      </button>

      {showModal && <Addtransaction onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default History;
