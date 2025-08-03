import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getTransactions } from "../utils/localStorageUtils";

const Dashboard = () => {
  const navigate = useNavigate();
  const initialBalanceSetRef = useRef(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedInitial = localStorage.getItem("initialBalance");
    const storedTransactions = getTransactions();

    if (!storedInitial) {
      const input = prompt(
        "Welcome to FinTrack! Please enter your initial balance (₹):"
      );
      if (input && !isNaN(input)) {
        localStorage.setItem("initialBalance", parseFloat(input));
        initialBalanceSetRef.current = true; // mark that balance was just set
      } else {
        alert("Invalid amount. You can add your balance later.");
      }
    }

    setTransactions(storedTransactions);
  }, []);

  const initialBalance = parseFloat(
    localStorage.getItem("initialBalance") || 0
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = initialBalance + totalIncome - totalExpense;

  // Sort transactions by most recent
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  useEffect(() => {
    const storedInitial = localStorage.getItem("initialBalance");
    const storedTransactions = getTransactions();

    if (!storedInitial) {
      const input = prompt(
        "Welcome to FinTrack! Please enter your initial balance (₹):"
      );
      if (input && !isNaN(input)) {
        localStorage.setItem("initialBalance", parseFloat(input));
        initialBalanceSetRef.current = true; // mark that balance was just set
      } else {
        alert("Invalid amount. You can add your balance later.");
      }
    }

    setTransactions(storedTransactions);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {/* Total Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500">Total Balance</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            ₹{balance.toFixed(2)}
          </p>
        </div>

        {/* Total Income */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-sm text-gray-500">Total Income</h3>
          <p className="text-2xl font-bold text-green-700 mt-2">
            ₹{totalIncome.toFixed(2)}
          </p>
        </div>

        {/* Total Expense */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <h3 className="text-sm text-gray-500">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">
            ₹{totalExpense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h4>

        <ul className="divide-y divide-gray-200">
          {recentTransactions.length === 0 ? (
            <li className="py-4 text-center text-gray-600">
              <p className="font-medium text-base">No transactions yet.</p>
              <p className="text-sm mt-1 text-blue-600">
                {initialBalance === 0 ? (
                  <>
                    Start by setting your{" "}
                    <span className="font-semibold">initial balance</span>.
                  </>
                ) : (
                  <>
                    You're all set! Start by{" "}
                    <span className="font-semibold">adding a transaction</span>.
                  </>
                )}
              </p>
            </li>
          ) : (
            recentTransactions.map((t) => (
              <li
                key={t.id}
                className="py-2 flex justify-between text-sm text-gray-700"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
                <div
                  className={`font-bold ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{t.amount.toFixed(2)}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
