import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../../utils/localStorageUtils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [initialBalance, setInitalBalance] = useState(0);
  const [justSetInitial, setJustSetInitial] = useState(false);

  // Ask initial balance if missing , then load transaction
  useEffect(() => {
    const storedInitial = localStorage.getItem("initialBalance");

    if (!storedInitial) {
      const input = prompt(
        "Welcome to FinTrack , Please Enter your Initial Balance (₹)"
      );
      if (input && !isNaN(input)) {
        const val = parseFloat(input);
        localStorage.setItem("initialBalance", val);
        setInitalBalance(val);
        setJustSetInitial(true);
      } else {
        alert("Invalid amount . You can add your balance later");
        setInitalBalance(0);
      }
    } else {
      setInitalBalance(parseFloat(storedInitial));
    }
    setTransactions(getTransactions());
  }, []);

  //Redirect after 10s only if balance was just set now
  useEffect(() => {
    if (!justSetInitial) return;
    const t = setTimeout(() => navigate("/history"), 10000);
    return () => clearTimeout(t);
  }, [justSetInitial, navigate]);

  // Total Income
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  // Total Expense
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // Set Balance
  const balance = initialBalance + totalIncome - totalExpense;

  // Recent Transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow-md p-6 border-1-4 border-blue-500">
          <h3 className="text-sm text-gray-500">Total Balance</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            ₹ {balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-1-4 border-green-500">
          <h3 className="text-sm text-gray-500">Total Income</h3>
          <p className="text-2xl font-bold text-green-700 mt-2">
            ₹ {totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-1-4 border-red-500">
          <h3 className="text-sm text-gray-500">Total Expense</h3>
          <p className="text-2xl font-bold text-red-700 mt-2">
            ₹ {totalExpense.toFixed(2)}
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
              <p className=" font-medium text-base">No Transactions Yet.</p>
              <p className="text-sm mt-1 text-blue-600">
                {initialBalance === 0 ? (
                  <>
                    Start by Setting Your {"  "}
                    <span className="font-semibold ">Initial Balance</span>
                  </>
                ) : (
                  <>
                    You Are All Set ! Start By{"  "}
                    <span className="font-semibold ">Adding a Transaction</span>
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
                  {t.type === "income" ? "+" : "-"}{" "}₹{" "}{t.amount.toFixed(2)}
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
