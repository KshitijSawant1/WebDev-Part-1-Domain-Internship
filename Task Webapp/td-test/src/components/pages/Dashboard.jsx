// src/pages/Dashboard.jsx
import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // --- Demo data (replace with your real metrics) ---
  const pieData = [
    { name: "Completed", value: 24, color: "#22c55e" },
    { name: "In Progress", value: 12, color: "#f59e0b" },
    { name: "Overdue", value: 4, color: "#ef4444" },
  ];

  const barData = [
    { day: "Mon", tasks: 5 },
    { day: "Tue", tasks: 8 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: 4 },
    { day: "Sat", tasks: 7 },
    { day: "Sun", tasks: 2 },
  ];

  const weeklyPriority = [
    { day: "Mon", ui: 3, ni: 2, un: 1, nn: 0 },
    { day: "Tue", ui: 4, ni: 1, un: 2, nn: 0 },
    { day: "Wed", ui: 2, ni: 3, un: 1, nn: 2 },
    { day: "Thu", ui: 5, ni: 0, un: 1, nn: 1 },
    { day: "Fri", ui: 1, ni: 2, un: 2, nn: 2 },
    { day: "Sat", ui: 2, ni: 2, un: 3, nn: 1 },
    { day: "Sun", ui: 0, ni: 1, un: 2, nn: 3 },
  ];
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top: Welcome / Signout card */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="w-full bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <p className="text-sm text-gray-600">
              Signed in as{" "}
              <span className="font-medium text-green-600">
                {session?.user?.email}
              </span>
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-block px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition"
            aria-label="Sign out of your account"
          >
            Sign Out
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Total Tasks</p>
            <p className="text-2xl font-semibold text-gray-800">40</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Completed This Week</p>
            <p className="text-2xl font-semibold text-gray-800">12</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Overdue</p>
            <p className="text-2xl font-semibold text-gray-800">4</p>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Task Status
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Tasks per Day
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Priority Area (stacked) */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Weekly Task Priorities
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyPriority}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="ui"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#fecaca"
                    name="Urgent & Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="ni"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#bfdbfe"
                    name="Not Urgent & Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="un"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#fde68a"
                    name="Urgent & Not Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="nn"
                    stackId="1"
                    stroke="#10b981"
                    fill="#bbf7d0"
                    name="Not Urgent & Not Important"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-10" />
      </div>
    </div>
  );
};

export default Dashboard;
