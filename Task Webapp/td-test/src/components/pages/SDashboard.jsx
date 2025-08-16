// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
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
import { fetchTasks } from "../../utils/taskService";

const PRIORITIES = [
  "Priority & Important",
  "Not Priority & Important",
  "Priority & Not Important",
  "Not Priority & Not Important",
];

const deriveInsights = (tasks) => {
  const now = new Date(),
    days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

  let status = { upcoming: 0, inProgress: 0, past: 0 };
  let perDay = days.map((d) => ({
    day: d.toLocaleDateString(undefined, { weekday: "short" }),
    tasks: 0,
  }));
  let perPriority = days.map((d) => ({
    day: d.toLocaleDateString(undefined, { weekday: "short" }),
    ui: 0,
    ni: 0,
    un: 0,
    nn: 0,
  }));

  tasks.forEach((t) => {
    const s = t.start_date ? new Date(t.start_date) : null;
    const e = t.end_date ? new Date(t.end_date) : null;
    const c = t.created_at ? new Date(t.created_at) : null;

    if (s && e)
      status[now < s ? "upcoming" : now < e ? "inProgress" : "past"]++;
    else if (s) status[now < s ? "upcoming" : "inProgress"]++;
    else if (e) status[now < e ? "inProgress" : "past"]++;
    else status.upcoming++;

    if (c) {
      const i = days.findIndex(
        (d) => d.toDateString() === new Date(c).toDateString()
      );
      if (i >= 0) perDay[i].tasks++;
    }

    const anchor = s || c;
    if (anchor) {
      const i = days.findIndex(
        (d) => d.toDateString() === anchor.toDateString()
      );
      if (i >= 0) {
        const map = {
          [PRIORITIES[0]]: "ui",
          [PRIORITIES[1]]: "ni",
          [PRIORITIES[2]]: "un",
          [PRIORITIES[3]]: "nn",
        };
        perPriority[i][map[t.priority] || "ni"]++;
      }
    }
  });

  return {
    pie: [
      { name: "Upcoming", value: status.upcoming, color: "#60a5fa" },
      { name: "In Progress", value: status.inProgress, color: "#f59e0b" },
      { name: "Past", value: status.past, color: "#22c55e" },
    ],
    bar: perDay,
    area: perPriority,
    stats: {
      total: tasks.length,
      completedThisWeek: tasks.filter(
        (t) =>
          t.end_date &&
          new Date(t.end_date) >= days[0] &&
          new Date(t.end_date) <= now
      ).length,
      overdue: tasks.filter((t) => t.end_date && new Date(t.end_date) < now)
        .length,
    },
  };
};

const SDashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;
    (async () => {
      setTasks(await fetchTasks(session.user.id));
      setLoading(false);
    })();
  }, [session]);

  const { pie, bar, area, stats } = useMemo(
    () => deriveInsights(tasks),
    [tasks]
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-6xl mx-auto px-4 pt-10">
      <div className="p-5" />
      {/* Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm">
            Signed in as{" "}
            <span className="text-green-600">{session?.user?.email}</span>
          </p>
        </div>
        <button
          onClick={() => {
            signOut();
            navigate("/");
          }}
          className="px-6 py-2 text-sm text-white bg-red-600 rounded"
        >
          Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {["Total Tasks", "Completed This Week", "Past"].map((t, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">{t}</p>
            <p className="text-2xl font-semibold">
              {loading
                ? "…"
                : [stats.total, stats.completedThisWeek, stats.overdue][i]}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Chart title="Task Status">
          <PieChart>
            <Pie
              data={pie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label
            >
              {pie.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Chart>
        <Chart title="Tasks per Day">
          <BarChart data={bar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#60a5fa" />
          </BarChart>
        </Chart>
        <Chart title="Weekly Priorities">
          <AreaChart data={area}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area dataKey="ui" stackId="1" stroke="#ef4444" fill="#fecaca" />
            <Area dataKey="ni" stackId="1" stroke="#3b82f6" fill="#bfdbfe" />
            <Area dataKey="un" stackId="1" stroke="#f59e0b" fill="#fde68a" />
            <Area dataKey="nn" stackId="1" stroke="#10b981" fill="#bbf7d0" />
          </AreaChart>
        </Chart>
      </div>
    </div>
  );
};

const Chart = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-sm font-semibold mb-2">{title}</h3>
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

export default SDashboard;
