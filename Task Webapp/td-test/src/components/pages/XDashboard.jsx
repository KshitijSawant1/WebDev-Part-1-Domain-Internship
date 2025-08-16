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

// Priority buckets we’ll aggregate for the stacked area chart
const PRIORITY_KEYS = [
  "Priority & Important",
  "Not Priority & Important",
  "Priority & Not Important",
  "Not Priority & Not Important",
];

// --- helper: date utilities ---
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const fmtDay = (d) => d.toLocaleDateString(undefined, { weekday: "short" }); // Mon, Tue, ...

// Build a continuous 7-day window ending today
const lastNDays = (n = 7) => {
  const today = startOfDay(new Date());
  return Array.from({ length: n }).map((_, i) => addDays(today, -(n - 1 - i)));
};

// --- helper: derive insights from raw tasks ---
function deriveInsights(tasks) {
  const now = new Date();

  // Normalize records (guard against nulls/strings)
  const safe = (date) => (date ? new Date(date) : null);

  // Status buckets (no explicit "completed" flag in schema)
  let upcoming = 0;
  let inProgress = 0;
  let past = 0;

  // For charts
  const days = lastNDays(7); // array of Date objects for the last 7 days
  const dayKey = (d) => startOfDay(d).toISOString(); // map key (day start)

  // Initialize counts for "tasks created per day"
  const perDayCreated = Object.fromEntries(days.map((d) => [dayKey(d), 0]));

  // Initialize priority stacks per day
  const perDayPriority = Object.fromEntries(
    days.map((d) => [
      dayKey(d),
      {
        day: fmtDay(d),
        // start each key at 0
        [PRIORITY_KEYS[0]]: 0,
        [PRIORITY_KEYS[1]]: 0,
        [PRIORITY_KEYS[2]]: 0,
        [PRIORITY_KEYS[3]]: 0,
      },
    ])
  );

  for (const t of tasks) {
    const s = safe(t.start_date);
    const e = safe(t.end_date);
    const created = safe(t.created_at);

    // --- status buckets ---
    if (s && e) {
      if (now < s) upcoming += 1;
      else if (now >= s && now < e) inProgress += 1;
      else past += 1; // now >= e
    } else if (s && !e) {
      // no end date => treat as upcoming or in-progress depending on start
      if (now < s) upcoming += 1;
      else inProgress += 1;
    } else if (!s && e) {
      // no start but has end
      if (now < e) inProgress += 1;
      else past += 1;
    } else {
      // no dates at all -> ignore bucket or treat as upcoming
      upcoming += 1;
    }

    // --- tasks created per day (last 7 days) ---
    if (created) {
      const createdDayKey = dayKey(created);
      if (perDayCreated[createdDayKey] !== undefined) {
        perDayCreated[createdDayKey] += 1;
      }
    }

    // --- priority per day (last 7 days) ---
    // We’ll aggregate by the task’s start day if present,
    // otherwise by its created day—whichever falls in the 7-day window.
    const anchor = s || created;
    if (anchor) {
      const k = dayKey(anchor);
      if (perDayPriority[k]) {
        const p = t.priority || PRIORITY_KEYS[1]; // default bucket
        if (perDayPriority[k][p] !== undefined) {
          perDayPriority[k][p] += 1;
        }
      }
    }
  }

  // Build chart arrays
  const pieData = [
    { name: "Upcoming", value: upcoming, color: "#60a5fa" },
    { name: "In Progress", value: inProgress, color: "#f59e0b" },
    { name: "Past", value: past, color: "#22c55e" },
  ];

  const barData = days.map((d) => ({
    day: fmtDay(d),
    tasks: perDayCreated[dayKey(d)] || 0,
  }));

  const weeklyPriority = days.map((d) => {
    const k = dayKey(d);
    const row = perDayPriority[k];
    return {
      day: row.day,
      ui: row[PRIORITY_KEYS[0]] || 0,
      ni: row[PRIORITY_KEYS[1]] || 0,
      un: row[PRIORITY_KEYS[2]] || 0,
      nn: row[PRIORITY_KEYS[3]] || 0,
    };
  });

  // Quick stats (you can display more if you like)
  const totalTasks = tasks.length;
  const startOfThisWeek = (() => {
    const d = new Date();
    const day = d.getDay(); // 0..6 (Sun..Sat)
    const diff = d.getDate() - day; // go back to Sunday
    const s = new Date(d.setDate(diff));
    return startOfDay(s);
  })();

  const completedThisWeek = tasks.filter((t) => {
    const e = safe(t.end_date);
    return e && e >= startOfThisWeek && e <= now;
  }).length;

  const overdue = tasks.filter((t) => {
    const e = safe(t.end_date);
    return e && e < now;
  }).length;

  return {
    pieData,
    barData,
    weeklyPriority,
    quickStats: { totalTasks, completedThisWeek, overdue },
  };
}

const XDashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const userId = session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks(userId);
        setTasks(data || []);
      } catch (e) {
        setErr(e.message || "Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const insights = useMemo(() => deriveInsights(tasks), [tasks]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Welcome / Signout */}
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

        {/* Error */}
        {err && (
          <p className="mt-4 text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md px-4 py-3 shadow-sm">
            {err}
          </p>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Total Tasks</p>
            <p className="text-2xl font-semibold text-gray-800">
              {loading ? "…" : insights.quickStats.totalTasks}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Completed This Week</p>
            <p className="text-2xl font-semibold text-gray-800">
              {loading ? "…" : insights.quickStats.completedThisWeek}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-xs text-gray-500">Past (by end date)</p>
            <p className="text-2xl font-semibold text-gray-800">
              {loading ? "…" : insights.quickStats.overdue}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Status Pie */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Task Timeline Status
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insights.pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {insights.pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks per day (last 7 days) */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Tasks Created (Last 7 Days)
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={insights.barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Priority (stacked) */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Weekly Task Priorities
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={insights.weeklyPriority}
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
                    name="Priority & Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="ni"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#bfdbfe"
                    name="Not Priority & Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="un"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#fde68a"
                    name="Priority & Not Important"
                  />
                  <Area
                    type="monotone"
                    dataKey="nn"
                    stackId="1"
                    stroke="#10b981"
                    fill="#bbf7d0"
                    name="Not Priority & Not Important"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
};

export default XDashboard;
