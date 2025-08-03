import { useState, useEffect } from "react";
import { saveTransaction } from "../utils/localStorageUtils";

const AddTransactionModal = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  const getStoredTransactions = () => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const parsedAmount = parseFloat(amount);
    const allTransactions = getStoredTransactions();

    const initialBalance = parseFloat(
      localStorage.getItem("initialBalance") || 0
    );

    const totalIncome = allTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = allTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    const availableBalance = initialBalance + totalIncome - totalExpense;

    if (type === "expense" && parsedAmount > availableBalance) {
      alert("Insufficient balance! Please check your available funds.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parsedAmount,
      type,
      date,
    };

    const updatedTransactions = [...allTransactions, newTransaction];
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const transactions = getStoredTransactions();
    const initialBalance = parseFloat(
      localStorage.getItem("initialBalance") || 0
    );

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    setBalance(initialBalance + totalIncome - totalExpense);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center px-4 pointer-events-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Add Transaction
        </h2>
        <div className="mb-4 text-sm text-gray-700">
          Current Balance:{" "}
          <span className="font-semibold text-blue-600">
            ₹{balance.toFixed(2)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Amount (₹)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Type
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
