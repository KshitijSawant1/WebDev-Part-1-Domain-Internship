import { useState, useEffect } from "react";
import AddTransactionModal from "../components/AddTransactionalModal";
import { getTransactions, deleteTransaction } from "../utils/localStorageUtils";

const History = () => {
  const [showModal, setShowModal] = useState(false);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getTransactions());
  }, [showModal]); // Re-run after modal closes

  const handleDelete = (id) => {
    deleteTransaction(id);
    setTransactions(getTransactions()); // Refresh
  };

  return (
    <div className="relative p-4 sm:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 text-center">
        Transaction History
      </h2>

      {/* Responsive Scrollable Table */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Description</th>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2 text-right">Amount</th>
              <th className="py-2 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr className="text-gray-500 text-center">
                <td colSpan="5" className="py-4">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  <td className="py-2 px-2">{t.date}</td>
                  <td className="py-2 px-2">{t.description}</td>
                  <td className="py-2 px-2 capitalize">{t.type}</td>
                  <td
                    className={`py-2 px-2 text-right font-semibold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{t.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition text-3xl sm:text-2xl"
        aria-label="Add Transaction"
      >
        +
      </button>

      {/* Modal */}
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default History;
